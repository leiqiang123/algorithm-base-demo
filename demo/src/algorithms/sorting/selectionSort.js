import { Compare, defaultCompare, swap } from '../../utils/util'

//选择排序
function selectionSort(array, compareFn = defaultCompare) {
  let {length} = array
  let indexMin
  for(let i = 0; i < length - 1; i++) {
    indexMin = i
    for(let j = i; j < length; j++) {
      if(compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
        indexMin = j
      }
    }
    if(i !== indexMin) {
      swap(array, i, indexMin)
    }
  }
  return array
}