//栈
export default class Stack {
  constructor() {
    let _count = 0
    let _items = {}
  }
  //向栈添加元素
  push(element) {
    this.items[this._count] = element
    this._count++
  }
  //从栈移除元素
  pop(element) {
    if(this.isEmpty()) return undefined
    this._count--
    let result = this._items[this._count]
    delete this._items[this._count]
    return result
  }
  //查看栈顶元素
  peek() {
    if(this.isEmpty()) return undefined
    return this._items[this._count - 1]
  }
  //栈的长度
  size() {
    return this._count
  }
  //查看栈是否为空
  isEmpty() {
    return this._count === 0
  }
  //清空栈元素
  clear() {
    this._items = {}
    this._count = 0
  }
  toString() {
    if(this.isEmpty()) return ''
    let objString = `${this._items[0]}`
    for(let i = 1; i < this._count; i++) {
      objString = `${objString},${this._items[i]}`
    }
    return objString
  }
}