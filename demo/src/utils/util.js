export function defaultEquals(a, b) {
  return a === b
}

export function defaultDiff(a, b) {
  return Number(a) - Number(b);
}

export function defaultToString(item) {
  if (item === null) {
    return 'NULL'
  } else if (item === undefined) {
    return 'UNDEFINED'
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`
  }
  return item.toString()
}

export const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
}

export function defaultCompare(a, b) {
  if(a === b) {
    return 0
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

export const BalanceFactor = {
  UNBALANCED_RIGHT: 1,           //右侧不平衡
  SLIGHTLY_UNBALANCED_RIGHT: 2,  //右侧稍微不平衡
  BALANCED: 3,                   //左侧不平衡
  SLIGHTLY_UNBALANCED_LEFT: 4,   //左侧稍微不平衡
  UNBALANCED_LEFT: 5             //平衡
}

export const Colors = {
  RED: 'red',
  BLACK: 'black'
}

export function swap(array, a, b) {
  let temp = array[a]
  array[a] = array[b]
  array[b] = temp
}

export function reverseCompare(compareFn) {
  return (a, b) => compareFn(b, a)
}