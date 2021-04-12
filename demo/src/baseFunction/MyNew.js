function MyNew(fn, ...args) {
  let newObj = Object.create(fn.prototype)
  let result = fn.call(newObj, ...args)
  return typeof result === 'object' || result instanceof Function ? result : obj
}