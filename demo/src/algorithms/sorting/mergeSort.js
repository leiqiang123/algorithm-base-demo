import { Compare, defaultCompare, swap } from '../../utils/util'

//归并排序
function mergeSort(array, compareFn = defaultCompare) {
  if(array.length > 1) {
    let {length} = array
    let middle = Math.floor(length / 2)
    let left = mergeSort(array.slice(0, middle), compareFn)
    let right = mergeSort(array.slice(middle, length), compareFn)
    array = merge(left, right, compareFn)
  }
  return array
}

function merge(left, right, compareFn) {
  let i = 0
  let j = 0
  let result = []
  while(i < left.length && j < right.length) {
    result.push(compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++])
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j))
}