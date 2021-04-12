Function.prototype.MyApply = function(context) {
  if (context === null || context === undefined) {
    //指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
    context = window 
  } else {
    context = Object(context)//值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
  }
  // 判断是否是类数组对象
  function isArrayLike(o) {
    if (
      o &&
      typeof o === 'object' &&
      isFinite(o.length) &&
      o.length >= 0 &&
      o.length === Math.floor(o.length) &&
      o.length < 4294967296
    ) {
      return true
    } else {
      return false
    }
  }
  let key = Symbol()
  context[key] = this
  let args = arguments[1]
  let result
  if (args) {
    if (!Array.isArray(args) && !isArrayLike(args)) {
      throw new TypeError('myApply 第二个参数不为数组并且不为类数组对象抛出错误！')
    } else {
      args = Array.from(args)
      result = context[key](...args)
    }
  } else {
    result = context[key]()
  }
  delete context[key]
  return result
}

Function.prototype.MyCall = function(context, ...args) {
  if (context === null || context === undefined) {
    //指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中为window)
    context = window 
  } else {
    context = Object(context)//值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的实例对象
  }
  let key = Symbol()
  context[key] = this
  let result = context[key](...args)
  delete context[key]
  return result
}

Function.prototype.MyBind = function(objThis, ...params) {
  const thisFn = this  //存储源函数以及上方的 params（函数参数）
  //对返回的函数 secondParams 二次传参
  let fnToBind = function(...secondParams) {
    let isNew = this instanceof fnToBind
    let context = isNew ? this : Object(objThis)
    return thisFn.call(context, ...params, ...secondParams)
  }
  if (thisFn.prototype) {
    // 复制源函数的prototype给fnToBind 一些情况下函数没有prototype，比如箭头函数
    fnToBind.prototype = Object.create(thisFn.prototype)
  }
  return fnToBind
}
