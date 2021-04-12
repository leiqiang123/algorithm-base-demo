import { swap } from '../../utils/util'

//Fisher-Yates 随机算法
function shuffle(array) {
  for(let i = array.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1))
    swap(array, i, randomIndex)
  }
  return array
}