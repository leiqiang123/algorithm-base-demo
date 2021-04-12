//观察者
class Observer {
  // 构造器 cb 回调函数，收到目标对象通知时执行
  constructor(cb) {
    if (typeof cb === 'function') {
      this.cb = cb
    } else {
      throw new Error('Observer构造器必须传入函数类型！')
    }
  }
  update() {
    this.cb()
  }
}
//目标对象
class Subject {
  constructor() {
    //维护观察者列表
    this.ObserverList = []
  }
  //添加一个观察者
  addObserver(observer) {
    this.ObserverList.push(observer)
  }
  //通知所有的观察者
  notify() {
    this.ObserverList.forEach(observer => {
      observer.update()
    })
  }
}

let observerCallback = function() {
  console.log('我被通知了!')
}
let observer = new Observer(observerCallback)
let subject = new Subject()
subject.addObserver(observer)
subject.notify()