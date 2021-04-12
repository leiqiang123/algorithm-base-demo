import LinkedList from './linkedList'
import {defaultEquals} from '../utils/util'
import {Compare, defaultCompare} from '../utils/util'

//有序链表
export default class SortedLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
    super(equalsFn)
    this.compareFn = compareFn
  }
  //添加有序链表元素
  push(element) {
    if(this.isEmpty()) {
      super.push(element)
    }else {
      const index = this.getIndexNextSortedElement(element)
      super.insert(element, index)
    }
  }
  //有序插入元素
  insert(element, index = 0) {
    if(this.isEmpty()) {
      return super.insert(element, 0)
    }
    let pos = this.getIndexNextSortedElement(element)
    return super.insert(element, pos)
  }
  //获得插入元素的正确位置
  getIndexNextSortedElement(element) {
    let current = this.head
    let i = 0
    for(; i < this.size() && current; i++) {
      let comp = this.compareFn(element, current.element)
      if(comp === Compare.LESS_THAN) {
        return i
      }
      current = current.next
    }
    return i
  }
}