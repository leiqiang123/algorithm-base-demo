import { Compare, defaultCompare, swap } from '../../utils/util'

//ζε₯ζεΊ
export function insertionSort(array, compareFn = defaultCompare) {
  let {length} = array
  let temp
  for(let i = 1; i < length; i++) {
    let j = i
    temp = array[i]
    while(j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
      array[j] = array[j - 1]
      j--
    }
    array[j] = temp
  }
  return array
}