//单例模式
let CreateSingleton = (function() {
  let instance
  return function(name) {
    if (instance) {
      return instance
    }
    this.name = name
    return instance = this
  }
})()
CreateSingleton.prototype.getName = function() {
  return this.name
}

//代理版 单例模式
let ProxyCreateSingleton = (function() {
  let instance
  return function(name) {
    if (instance) {
      return instance
    }
    //代理函数仅作管控单例
    return instance = new Singleton(name)
  }
})()
//独立的Singleton类， 处理对象实例
let Singleton = function(name) {
  this.name = name
}
Singleton.prototype.getName = function() {
  return this.name
}

//惰性单例模式
let getSingleton = function(fn) {
  let result
  return function() {
    return result || (result = fn.apply(this, arguments)) //确定this上下文并传递参数
  }
}
let createAlertMessage = function(html) {
  let div = document.createElement('div')
  div.innerHTML = html
  div.style.display = 'none'
  document.body.appendChild(div)
  return div
}
let createSingleAlertMessage = getSingleton(createAlertMessage)

