//最小硬币找零问题 [1,3,4] 6
//动态规划
export function minCoinChange(coins, amount) {
  let cache = []
  let makeChange = value => {
    if(!value) {
      return []
    }
    if(cache[value]) {
      return cache[value]
    }
    let min = []
    let newMin
    let newAmount
    for (let i = 0; i < coins.length; i++) {
      let coin = coins[i]
      newAmount = value - coin
      if(newAmount >= 0) {
        newMin = makeChange(newAmount)
      }
      if(
        newAmount >= 0 && 
        (newMin.length < min.length - 1 || !min.length) && 
        (newMin.length || !newAmount)
      ) {
        min = [coin].concat(newMin)
        console.log('new Min' + min + 'for' + amount)
      }
    }
    return (cache[value] = min)
  }
  return makeChange(amount)
}

//贪心算法
function newMinCoinChange(coins, amount) {
  let change = []
  let total = 0
  for (let i = coins.length; i >= 0; i--) {
    let coin = coins[i]
    while (total + coin <= amount) {
      change.push(coin)
      total += coin
    }
  }
  return change
}