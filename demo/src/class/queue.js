//队列
export default class Queue {
  constructor() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  /*添加*/
  enqueue(element) {
    this.items[this.count] = element
    this.count++
  }
  /*移除 */
  dequeue() {
    if (this.isEmpty()) {
      return undefined
    }
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }
  /*查看队列头部元素 */
  peek() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.lowestCount]
  }
  /* 检查队列是否为空*/
  isEmpty() {
    return this.count - this.lowestCount === 0
  }
  /*获取队列长度 */
  size() {
    return this.count - this.lowestCount
  }
  /*清空队列*/
  clear() { 
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }

  toString() {
    if (this.isEmpty()) return ''
    let objString = `${this.items[this.lowestCount]}`
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`
    }
    return objString
  }
}