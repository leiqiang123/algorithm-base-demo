import {Compare, defaultCompare, swap, reverseCompare} from '../utils/util'

export class MinHeap {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn
    this.heap = []
  }
  /*
  对于给定位置 index 的节点:
  它的左侧子节点的位置是 2 * index + 1(如果位置可用);
  它的右侧子节点的位置是 2 * index + 2(如果位置可用); 
  它的父节点位置是 index / 2(如果位置可用)。
  */
  getLeftIndex(index) {
    return 2 * index + 1
  }
  getRightIndex(index) {
    return 2 * index + 2
  }
  getParentIndex(index) {
    if(index === 0) {
      return undefined
    }
    return Math.floor((index - 1) / 2)
  }
  /*
    insert(value):这个方法向堆中插入一个新的值。如果插入成功，它返回 true，否 则返回 false。
    extract():这个方法移除最小值(最小堆)或最大值(最大堆)，并返回这个值。
    findMinimum():这个方法返回最小值(最小堆)或最大值(最大堆)且不会移除这个值。
  */
  insert(value) {
    if(value != null) {
      this.heap.push(value)
      this.siftUp(this.heap.length - 1)
      return true
    }
    return false
  }
  siftUp(index) {
    let parent = this.getParentIndex(index)
    while(index > 0 && this.compareFn(this.heap[parent], this.heap[index]) === Compare.BIGGER_THAN) {
      swap(this.heap, parent, index)
      index = parent
      parent = this.getParentIndex(index)
    }
  }

  size() {
    return this.heap.length
  }

  isEmpty() {
    return this.size() <= 0
  }

  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0]
  }

  clear() {
    this.heap = []
  }

  extract() {
    if(this.isEmpty()) {
      return undefined
    }
    if(this.size() === 1) {
      return this.heap.shift()
    }
    let removedValue = this.heap[0]
    this.heap[0] = this.heap.pop()
    this.siftDown(0)
    return removedValue
  }

  siftDown(index) {
    let element = index
    let left = this.getLeftIndex(index)
    let right = this.getRightIndex(index)
    let size = this.size()
    if(left < size && this.compareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THAN) {
      element = left
    }
    if(right < size && this.compareFn(this.heap[element], this.heap[right]) === Compare.BIGGER_THAN) {
      element = right
    }
    if(index !== element) {
      swap(this.heap, index, element)
      this.siftDown(element)
    }
  }

  heapify(array) {
    if (array) {
      this.heap = array
    }
    const maxIndex = Math.floor(this.size() / 2) - 1
    for (let i = 0; i <= maxIndex; i++) {
      this.siftDown(i)
    }
    return this.heap
  }
}


export class MaxHeap extends MinHeap {
  constructor(compareFn = defaultCompare) {
    super(compareFn)
    this.compareFn = reverseCompare(compareFn)
  }
}