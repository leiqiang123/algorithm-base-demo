function MyInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left)
  let isProto = false
  while (proto !== null) {
    if (proto === right.prototype) {
      isProto = true
      break
    }
    proto = Object.getPrototypeOf(proto)
  }
  return isProto
}