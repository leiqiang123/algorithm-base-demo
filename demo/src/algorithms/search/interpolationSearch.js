import { Compare, defaultCompare, swap, defaultEquals, defaultDiff } from '../../utils/util'
import {quickSort} from '../sorting/quickSort'

const DOES_NOT_EXIST = -1

//内插搜索
export function interpolationSearch(array, value, compareFn = defaultCompare, equalsFn = defaultEquals, diffFn = defaultDiff) {
  let {length} = array
  let low = 0
  let high = length - 1
  let position = -1
  let delta = -1
  while(low <= high && biggerOrEquals(value, array[low], compareFn) && lesserOrEquals(value, array[high], compareFn)) {
    delta = diffFn(value, array[low]) / diffFn(array[high], array[low])
    position = low + Math.floor((high - low) * delta)
    if(equalsFn(array[position], value)) {
      return position
    }
    if(compareFn(array[position], value) === Compare.LESS_THAN) {
      low = position + 1
    }else {
      high = position - 1
    }
  }
  return DOES_NOT_EXIST
}

function lesserOrEquals(a, b, compareFn) {
  let comp = compareFn(a, b)
  return comp === Compare.LESS_THAN || comp === Compare.EQUALS
}

function biggerOrEquals(a, b, compareFn) {
  let comp = compareFn(a, b)
  return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS
}