import {Stack} from '../class/stack'
//十进制转换2-36进制
function baseConverter (decNumber, base) {
  if(decNumber < 2 || decNumber > 36) return ''
  let stack = new Stack()
  let digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let number = decNumber
  let rem
  let baseStr = ''
  while(number > 0) {
    rem = Math.floor(number % base)
    stack.push(rem)
    number = Math.floor(number / base)
  }
  while(!stack.isEmpty()) {
    baseStr += digits[stack.pop()]
  }
  return baseStr
}