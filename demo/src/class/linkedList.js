import {defaultEquals} from '../utils/util'
import {Node} from '../modules/linked-list-module'

//链表
export default class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0
    this.head = undefined
    this.equalsFn = equalsFn
  }

  //向链表尾部添加元素
  push(element) {
    let node = new Node(element)
    let current
    if(this.head == null) {
      this.head = node
    }else {
      current = this.head
      //获取链表最后一项
      while(current.next != null) {
        current = current.next
      }
      // 将其 next 赋为新元素，建立链接
      current.next = node
    }
    this.count++
  }
  //向链表的特定位置插入一个新元素。
  insert(element, index) {
    if(index >= 0 && index <= this.count) {
      let node = new Node(element)
      if(index === 0) {
        let current = this.head
        node.next = current
        this.head = node
      }else {
        let previous = this.getElementAt(index - 1)
        let current = previous.next
        node.next = current
        previous.next = node
      }
      //更新链表长度
      this.count++
      return true
    }
    return false
  }
  //从链表中移除一个元素。
  remove(element) {
    let index = this.indexOf(element)
    return this.getElementAt(index)
  }
  //从链表的特定位置移除一个元素
  removeAt(index) {
    // 检查越界值
    if(index >= 0 && index < this.count) {
      let current = this.head
      // 移除第一项
      if(index === 0) {
        this.head = current.next
      }else {
        let previous = this.getElementAt(index - 1)
        current = previous.next
        // 将previous与current的下一项链接起来:跳过current，从而移除它
        previous.next = current.next
      }
      this.count--
      return current.element
    }
    return undefined
  }
  //返回元素在链表中的索引。如果链表中没有该元素则返回-1。
  indexOf(element) {
    let current = this.head
    let index = 0
    while(current != null) {
      if(this.equalsFn(element, current.element)) {
        return index
      }
      index++
      current = current.next
    }
    return -1
  }
  //返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回 undefined。
  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let current = this.head
      for (let i = 0; i < index && current != null; i++) {
        current = current.next
      }
      return current
    }
    return undefined
  }
  //如果链表中不包含任何元素，返回 true，如果链表长度大于 0 则返回 false。
  isEmpty() {
    return this.size() === 0
  }
  //返回链表包含的元素个数，与数组的 length 属性类似。
  size() {
    return this.count
  }
  //获取链表头部元素
  getHead() {
    return this.head
  }
  //清空链表
  clear() {
    this.head = undefined
    this.count = 0
  }
  //返回表示整个链表的字符串。由于列表项使用了 Node 类，就需要重写继承自 JavaScript 对象默认的 toString 方法，让其只输出元素的值。
  toString() {
    if(this.head == null) {
      return ''
    }
    let objString = `${this.head.element}`
    let current = this.head.next
    for(let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`
      current = current.next
    }
    return objString
  }
}