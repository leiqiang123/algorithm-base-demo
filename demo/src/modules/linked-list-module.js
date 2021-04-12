//用来表示想要添加到链表中的项
export class Node {
  constructor(element, next) {
    this.element = element
    this.next = next
  }
}

export class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next)
    this.prev = prev
  }
}