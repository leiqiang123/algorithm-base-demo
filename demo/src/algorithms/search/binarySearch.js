import { Compare, defaultCompare, swap } from '../../utils/util'
import {quickSort} from '../sorting/quickSort'

const DOES_NOT_EXIST = -1

//二分搜索
export function binarySearch(array, value, compareFn = defaultCompare) {
  let sortedArray = quickSort(array)
  let low = 0
  let high = sortedArray.length - 1
  while(lesserOrEqualsA(low, high, compareFn)) {
    let mid = Math.floor((low + high) / 2)
    let element = sortedArray[mid]
    if(compareFn(element, value) === Compare.LESS_THAN) {
      low = mid + 1
    }else if(compareFn(element, value) === Compare.BIGGER_THAN) {
      high = mid - 1
    }else {
      return mid
    }
  }
  return DOES_NOT_EXIST
  /*
  分而治之----二分搜索
  return binarySearchRecursive(array, value, low, high, compareFn)
  */
}

function lesserOrEqualsA(a, b, compareFn) {
  let comp = compareFn(a, b)
  return comp === Compare.LESS_THAN || comp === Compare.EQUALS
}

//分而治之----二分搜索
function binarySearchRecursive(array, value, low, high, compareFn = defaultCompare) {
  if(low <= high) {
    let mid = Math.floor((low + high) * 2)
    let element = array[mid]
    if(compareFn(element, value) === Compare.LESS_THAN) {
      return binarySearchRecursive(array, value, mid + 1, high, compareFn)
    }else if(compareFn(element, value) === Compare.BIGGER_THAN) {
      return binarySearchRecursive(array, value, low, high - 1, compareFn)
    }else {
      return mid
    }
  }
  return DOES_NOT_EXIST
}