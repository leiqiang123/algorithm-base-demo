import { Compare, defaultCompare, swap } from '../../utils/util'

//快速排序
/*
  (1) 首先，从数组中选择一个值作为主元(pivot)，也就是数组中间的那个值。
  (2) 创建两个指针(引用)，左边一个指向数组第一个值，右边一个指向数组最后一个值。
  移动左指针直到我们找到一个比主元大的值，接着，移动右指针直到找到一个比主元小的值，然后交换它们，重复这个过程，直到左指针超过了右指针。
  这个过程将使得比主元小的值都排在主元之前，而比主元大的值都排在主元之后。这一步叫作划分(partition)操作。
  (3) 接着，算法对划分后的小数组(较主元小的值组成的子数组，以及较主元大的值组成的子数组)重复之前的两个步骤，直至数组已完全排序。
*/
function quickSort(array, compareFn = defaultCompare) {
  return quick(array, 0, array.length - 1, compareFn)
}

function quick(array, left, right, compareFn) {
  let index
  if(array.length > 1) {
    index = partition(array, left, right, compareFn)
    if(left < index - 1) {
      quick(array, left, right - 1, compareFn)
    }
    if(index < right) {
      quick(array, index, right, compareFn)
    }
  }
  return array
}

function partition(array, left, right, compareFn) {
  let pivot = array[Math.floor((right + left) / 2)]
  let i = left
  let j = right

  while(i <= j) {
    while(compareFn(array[i], pivot) === Compare.LESS_THAN) {
      i++
    }
    while(compareFn(array[j], prvot) === Compare.BIGGER_THAN) {
      j--
    }
    if(i <= j) {
      swap(array, i, j)
      i++
      j--
    }
  }
  return i
}