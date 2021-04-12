//定义3个状态常量
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    //executor是一个执行器，进入会立即执行
    try {
      executor(this.resolve, this.reject)
    } catch(error) {
      //如果有错误，直接执行 reject
      this.reject(error)
    }
  }
  //存储状态的变量，初始值为pending
  status = PENDING
  //成功后的值
  value = null
  //失败后的值
  reason = null
  //存储成功回调函数
  onFulfilledCallbacks = []
  //存储失败回调函数
  onRejectedCallbacks = []
  //更新成功后的状态
  resolve = (value) => {
    //只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      //状态修改为成功
      this.status = FULFILLED
      //保存成功后的值
      this.value = value
      //将所有的成功回调拿出来执行
      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(value)
      }
    }
  }
  //更改失败的状态
  reject = (reason) => {
    //只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      //状态修改为失败
      this.status = REJECTED
      //保存失败后的原因
      this.reason = reason
      //将所有的成功回调拿出来执行
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }
  then(onFulfilled, onRejected) {
    //若不传，则使用默认函数
    const realOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    const realOnRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
    //为了链式调用，直接创建一个 MyPromise ，并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        //创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            let x = realOnFulfilled(this.value)
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      const rejectedMicrotask = () => {
        //创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            //调用失败回调，并把原因返回
            let x = realOnRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      //判断状态
      if (this.status === FULFILLED) {
        fulfilledMicrotask()
      } else if (this.status === REJECTED) {
        rejectedMicrotask()
      } else if (this.status === PENDING) {
        /*
          因为不知道状态变化，所以将成功和失败回调存储起来
          等到执行成功或失败函数的时候再传递
        */
        this.onFulfilledCallbacks.push(fulfilledMicrotask)
        this.onRejectedCallbacks.push(rejectedMicrotask)
      }
    })
    return promise2
  }
  // resolve 静态方法
  static resolve(parameter) {
    //如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter
    }

    //转成常规方式
    return new MyPromise(resolve => {
      resolve(parameter)
    })
  }
  // reject 静态方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
}
function resolvePromise(promise, x, resolve, reject) {
  // 如果相等了，说明 return 的是自己， 抛出类型错误并返回
  if (promise === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if (typeof x === 'object' || typeof x === 'function') {
    // x 为 null 直接返回
    if (x === null) {
      return resolve(x)
    }
    let then
    try {
      then = x.then
    } catch (error) {
      // 如果取 x.then 的值时抛出错误 error ，则以 error 为据因拒绝 promise
      return reject(error)
    }
    // 如果 then 是函数
    if (typeof then === 'function') {
      let called = false
      try {
        then.call(
          x, // this 指向 x
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          y => {
            // 如果 resolvePromise 和 rejectPromise 均被调用，
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量 called
            if (called) return
            called = true
            resolvePromise(promise, y, resolve, reject)
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          r => {
            if (called) return;
            called = true;
            reject(r);
          }
        )
      } catch (error) {
        // 如果调用 then 方法抛出了异常 error
        // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
        if (called) return
        // 否则以 error 为据因拒绝 promise
        reject(error)
      }
    } else {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x)
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x)
  }
}
function resolvePromise2(promise2, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // 判断x是不是 MyPromise 实例对象
  if(x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject)
  } else{
    // 普通值
    resolve(x)
  }
}


MyPromise.resolve().then(() => {
  console.log(0)
  return MyPromise.resolve(4)
}).then((res) => {
  console.log(res)
})

MyPromise.resolve().then(() => {
  console.log(1)
}).then(() => {
  console.log(2)
}).then(() => {
  console.log(3)
}).then(() => {
  console.log(5)
}).then(() =>{
  console.log(6)
})

