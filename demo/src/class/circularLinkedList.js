import LinkedList from './linkedList'
import {Node} from '../modules/linked-list-module'

//循环链表
export default class CircularLinkedList extends LinkedList {
  constructor(equalsFn) {
    super(equalsFn)
  }

  //向循环链表添加一个元素
  push(element) {
    const node = new Node(element)
    let current
    if (this.head == null) {
      this.head = node
    } else {
      current = this.getElementAt(this.size() - 1)
      current.next = node
    }
    node.next = this.head
    this.count++
  }
  //向循环链表的特定位置插入一个新元素。
  insert(element, index) {
    if(index >= 0 && index <= this.count) {
      let node = new Node(element)
      let current = this.head
      if(index === 0) {
        if(this.head == null) {
          this.head = node
          node.next = this.head
        }else {
          node.next = current
          current = this.getElementAt(this.size() - 1)
          //更新最后一个元素
          this.head = node
          current.next = this.head
        }
      }else {
        let previous = this.getElementAt(index - 1)
        node.next = previous.next
        previous.next = node
      }
      //更新链表长度
      this.count++
      return true
    }
    return false
  }
  //从循环链表中任意位置移除元素
  removeAt(index) {
    if(index >= 0 && index < this.count) {
      let current = this.head
      if(index === 0) {
        if(this.size() === 1) {
          this.head = undefined
        }else {
          let removed = this.head
          current = this.getElementAt(this.size() - 1)
          this.head = this.head.next
          current.next = this.head
          current = removed
        }
      }else {
        // 不需要修改循环链表最后一个元素
        let previous = this.getElementAt(index - 1)
        current = previous.next
        previous.next = current.next
      }
      this.count--
      return current.element
    }
    return undefined
  }
}