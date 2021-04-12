import LinkedList from './linkedList'
import {DoublyNode} from '../modules/linked-list-module'

//双向链表
export default class DoublyLinkedList extends LinkedList {
  constructor(equalsFn) {
    super(equalsFn)
    this.tail = undefined //链表最后一个元素的引用
  }
  //向双向链表尾部添加元素
  push(element) {
    const node = new DoublyNode(element)
    if (this.head == null) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
    }
    this.count++
  }
  //向双向链表的特定位置插入一个新元素。
  insert(element, index) {
    if(index >= 0 && index <= this.count) {
      let node = new DoublyNode(element)
      let current = this.head
      if(index === 0) {
        if(this.head == null) {
          this.head = node
          this.tail = node
        }else {
          node.next = this.head
          current.prev = node
          this.head = node
        }
      }else if(index === this.count) {
        current = this.tail
        current.next = node
        node.prev = current
        this.tail = node
      }else {
        let previous = this.getElementAt(index - 1)
        current = previous.next
        node.next = current
        previous.next = node
        current.prev = node
        node.prev = previous
      }
      this.count++
      return true
    }
    return false
  }
  //从双向链表的特定位置移除一个元素
  removeAt(index) {
    if(idnex >= 0 && index < this.count) {
      let current = this.head
      if(index === 0) {
        this.head = current.next
        //如果只有一项，更新tail
        if(this.count === 1) {
          this.tail = undefined
        }else {
          this.head.prev = undefined
        }
      }else if(index === this.count - 1) {
        current = this.tail
        this.tail = current.prev
        this.tail.next = undefined
      }else {
        current = this.getElementAt(index)
        let previous = current.prev
        //将previous与current的下一项链接起来——跳过current
        previous.next = current.next
        current.next.prev = previous
      }
      this.count--
      return current.element
    }
    return undefined
  }
  //获取双向链表最后一个元素
  getTail() {
    return this.tail
  }
  //清空链表
  clear() {
    super.clear()
    this.tail = undefined
  }
}