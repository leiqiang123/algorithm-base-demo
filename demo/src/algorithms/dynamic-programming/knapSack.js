//背包问题
//动态规划
function knapSack(capacity = 5, weights, values) {
  let n = values.length
  let kS = []
  for (let i = 0; i <= n; i++) {
    kS[i] = []
  }
  for (let i = 0; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if(i === 0 || w === 0) {
        kS[i][w] = 0
      }else if(weights[i - 1] <= w) {
        let a = values[i - 1] + kS[i - 1][w - weights[i - 1]]
        let b = kS[i - 1][w]
        kS[i][w] = a > b ? a : b
      }else {
        kS[i][w] = kS[i - 1][w]
      }
    }
  }
  findValues(n, capacity, kS, weights, values)
  return kS[n][capacity]
}

function findValues(n, capacity, kS, weights, values) {
  let i = n
  let k = capacity
  console.log('构成的物品：')
  while(i > 0 && k > 0) {
    if(kS[i][k] !== kS[i - 1][k]) {
      console.log(`物品${i}可以是解的一部分w,v：${weights[i - 1]}, ${values[i - 1]}`)
      i--
      k -= kS[i][k]
    }else {
      i--
    }
  }
}

//贪心算法
function newKnapSack(capacity, weights, values) {
  let n = values.length
  let load = 0
  let val = 0
  for (let i = 0; i < n && load < capacity; i++) {
    if(weights[i] <= capacity - load) {
      val += values[i]
      load += weights[i]
    }else {
      let r = (capacity - load) / weights
      val += r * values[i]
      load += weights[i]
    }
  }
  return val
}