import { Compare, defaultCompare, swap } from '../../utils/util'

//冒泡排序
function bubbleSort(array, compareFn = defaultCompare) {
  let {length} = array
  for(let i = 0; i < length; i++) {
    for(let j = 0; j < length - 1; j++) {
      if(compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1)
      }
    }
  }
  return array
}

function modifiedBubbleSort(array, compareFn = defaultCompare) {
  let {length} = array
  for(let i = 0; i < length; i++) {
    for(let j = 0; j < length - 1 - i; j++) {
      if(compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1)
      }
    }
  }
  return array
}