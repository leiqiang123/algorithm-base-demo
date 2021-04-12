function curry(fn) {
  if (fn.length <= 1) return fn
  let generator = (...args) => {
    if (fn.length === args.length) {
      return fn(...args)
    } else {
      return (...args2) => {
        return generator(...args, ...args2)
      }
    }
  }
  return generator
}

function curry2(fn, placeholder = '_') {
  curry2.placeholder = placeholder
  if (fn.length <= 1) return fn
  let argsList = []
  let generator = (...args) => {
    // 记录了非当前轮最近的一个占位符下标，防止当前轮元素覆盖了当前轮的占位符
    let currentPlaceholderIndex = -1
    args.forEach(arg => {
      let placeholderIndex = argsList.findIndex(item => item === curry2.placeholder)
      if (placeholderIndex < 0) {
        //如果数组中没有占位符直接往数组末尾放入一个元素
        currentPlaceholderIndex = argsList.push(arg) - 1
        // 防止将元素填充到当前轮参数的占位符
        // (1, '_')('_', 2) 数字2应该填充1后面的占位符，不能是2前面的占位符
      } else if (placeholderIndex !== currentPlaceholderIndex) {
        argsList[placeholderIndex] = arg
      } else {
        argsList.push(arg)
      }
    })
    // 过滤出不含占位符的数组
    let realArgsList = argsList.filter(arg => arg !== curry2.placeholder)
    if (realArgsList.length === fn.length) {
      return fn(...argsList)
    } else if (realArgsList.length > fn.length) {
      throw new Error('超出初始函数参数最大值！')
    } else {
      return generator
    }
  }
  return generator
}