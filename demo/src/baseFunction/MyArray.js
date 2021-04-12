Array.prototype.myReduce = function(cb, initValue) {
  if (!Array.isArray(this)) {
    throw new TypeError('not a array')
  }
  if (this.length === 0 && arguments.length < 2) {
    throw new TypeError('Reduce of empty array with no initial value')
  }
  let arr = this
  let res = null
  //判断是否有初始值，若没有则取数组第一个值
  if (arguments.length > 1) {
    res = initValue
  } else {
    res = arr.splice(0, 1)[0]
  }
  arr.forEach((item, index) => {
    res = cb(res, item, index, arr)
  })
  return res
}