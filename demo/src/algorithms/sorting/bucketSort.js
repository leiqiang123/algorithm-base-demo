import { Compare, defaultCompare, swap } from '../../utils/util'
import {insertionSort} from './insertionSort'

//桶排序
function bucketSort(array, bucketSize = 5) {
  if(array.length < 2) {
    return array
  }
  let buckets = createBuckets(array, bucketSize)
  return sortBuckets(buckets)
}

function createBuckets(array, bucketSize) {
  let minValue = array[0]
  let maxValue = array[0]
  for(let i = 0; i < array.length; i++) {
    if(array[i] < minValue) {
      minValue = array[i]
    }else if(array[i] > maxValue) {
      maxValue = array[i]
    }
  }
  let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1
  let buckets = []
  for(let i = 0; i < bucketCount; i++) {
    buckets[i] = []
  }
  for(let i = 0; i < array.length; i++) {
    let bucketIndex = Math.floor((arr[i] - minValue) / bucketSize)
    buckets[bucketIndex].push(array[i])
  }
  return buckets
}

function sortBuckets(buckets) {
  let sortedArray = []
  for(let i = 0; i< buckets.length; i++) {
    if(buckets[i] != null) {
      insertionSort(buckets[i])
      sortedArray.push(...buckets[i])
    }
  }
  return sortedArray
}