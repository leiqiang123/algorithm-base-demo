import { Compare, defaultCompare, swap } from '../../utils/util'

//计数排序
function countingSort(array) {
  if(array.length < 2) {
    return array
  }
  let maxValue = findMaxValue(array)
  let counts = new Array(maxValue + 1)
  array.forEach(element => {
    if(!counts[element]) {
      counts[element] = 0
    }
    counts[element]++
  })
  let sortedIndex = 0
  counts.forEach((count, i) => {
    while(count > 0) {
      array[sortedIndex++] = i
      count--
    }
  })
  return array
}

export function findMaxValue(array) {
  let max = array[0]
  for(let i = 1; i < array.length; i++) {
    if(array[i] > max) {
      max = array[i]
    }
  }
  return max
}

export function findMinValue(array) {
  let min = array[0]
  for(let i = 1; i < array.length; i++) {
    if(array[i] < min) {
      min = array[i]
    }
  }
  return min
}