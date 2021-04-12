const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    this.state = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    let resolve = value => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    let reject = reason => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }
    let promise2 = new MyPromise((resolve, reject) => {
      let onFulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error) 
          }
        })
      }
      let onRejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.state === FULFILLED) {
        onFulfilledMicrotask()
      } else if (this.state === REJECTED) {
        onRejectedMicrotask()
      } else if (this.state === PENDING) {
        this.onResolvedCallbacks.push(onFulfilledMicrotask)
        this.onRejectedCallbacks.push(onRejectedMicrotask)
      }
    })
    return promise2
  }
  catch(fn) {
    return this.then(null, fn)
  }
  static resolve(val) {
    //如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter
    }
    return new MyPromise(resolve => {
      resolve(parameter)
    })
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(resolve, reject)
      }
    })
  }
  static all(promises) {
    return new MyPromise((resolve, reject) => {
      let arr = []
      let i = 0
      function processData(index, data) {
        arr[index] = data
        i++
        if(i === promises.length) {
          console.log(arr)
          resolve(arr)
        }
      }
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(data => {
          processData(i, data)
        }, reject)
      }
    })
  }
}
function resolvePromise(promise, x, resolve, reject) {
  //循环引用报错
  if (x === promise) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  //防止多次调用
  let called
  // x 不是 null 且 x 是对象或者函数
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then
      //如果 then 是函数，则默认是promise
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (called) return
            called = true
            resolvePromise(promise, y, resolve, reject)
          },
          err => {
            if (called) return
            called = true
            reject(err)
          }
        )
      } else {
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}

let p1 = new MyPromise((res, rej) => {
  setTimeout(() => {res('111')}, 2000)
})
p1.then(res => {
  console.log(1)
  console.log(res)
})
p1.then(res => {
  console.log(2)
  console.log(res)
})
p1.then(res => {
  console.log(3)
  console.log(res)
})