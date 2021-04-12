/*
最长公共子序列
 找出两个字符串序列的最长子序列的长度。最长子序列是指，在两个字符串序列中以相同顺序出现，但不要求连续(非字符串子串)的字符串序列。
 acbaed
 abcadf
*/
function lcs(wordX, wordY) {
  let m = wordX.length
  let n = wordY.length
  let l = []
  for (let i = 0; i <= m; i++) {
    l[i] = []
    for(let j = 0; j <= n; j++) {
      l[i][j] = 0
    }
  }
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if(i === 0 || j === 0) {
        l[i][j] = 0
      }else if(wordX[i - 1] === wordY[j - 1]) {
        l[i][j] = l[i - 1][j - 1] + 1
      }else {
        let a = l[i - 1][j]
        let b = l[i][j - 1]
        l[i][j] = a > b ? a : b
      }
    }
  }
  return l[m][n]
}

//大数相加
function bigNumberAdd(a, b) {
  let aList = a.split('').map(item => Number(item))
  let bList = b.split('').map(item => Number(item))
  let maxLength = aList.length > bList.length ? aList.length : bList.length
  if(aList.length > bList.length) {
    bList = new Array(aList.length - bList.length).fill(0).concat(bList)
  }else {
    aList = new Array(bList.length - aList.length).fill(0).concat(aList)
  }
  let newList = []
  let numberCarry = 0
  for (let index = maxLength - 1; index >= 0; index--) {
    if(aList[index] + bList[index] + numberCarry >= 10) {
      let number = (aList[index] + bList[index] + numberCarry) % 10
      newList.unshift(number)
      numberCarry = 1
    }else {
      newList.unshift(aList[index] + bList[index] + numberCarry)
      numberCarry = 0
    }
  }
  if(numberCarry === 1) {
    newList.unshift(1)
  }
  return newList.join('')
}
