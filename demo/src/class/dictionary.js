import {defaultToString} from '../utils/util'
import {ValuePair} from '../modules/valuePair'

//字典
export default class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }
  /*
    set(key,value):向字典中添加新元素。如果 key 已经存在，那么已存在的 value 会 被新的值覆盖。
    remove(key):通过使用键值作为参数来从字典中移除键值对应的数据值。
    hasKey(key):如果某个键值存在于该字典中，返回 true，否则返回 false。
    get(key):通过以键值作为参数查找特定的数值并返回。
    clear():删除该字典中的所有值。
    size():返回字典所包含值的数量。与数组的 length 属性类似。
    isEmpty():在 size 等于零的时候返回 true，否则返回 false。
    keys():将字典所包含的所有键名以数组形式返回。
    values():将字典所包含的所有数值以数组形式返回。
    keyValues():将字典中所有[键，值]对返回。
    forEach(callbackFn):迭代字典中所有的键值对。callbackFn 有两个参数:key 和 value。该方法可以在回调函数返回 false 时被中止(和 Array 类中的 every 方法相似)。
  */
  hasKey(key) {
    return this.table[this.toStrFn(key)] != null
  }
  set(key, value) {
    if (key != null && value != null) {
      let tableKey = this.toStrFn(key)
      this.table[tableKey] = new ValuePair(key, value)
      return true
    }
    return false
  }
  remove(key) {
    if(this.hasKey(key)) {
      delete this.table[this.toStrFn(key)]
      return true
    }
    return false
  }
  get(key) {
    let valuePair = this.table[this.toStrFn(key)]
    return valuePair == null ? undefined : valuePair.value
  }
  keyValues() {
    return Object.values(this.table)
  }
  keys() {
    return this.keyValues().map(valuePair => valuePair.key)
  }
  values() {
    return this.keyValues().map(valuePair => valuePair.value)
  }
  forEach(callbackFn) {
    let valuePairs = this.keyValues()
    for(let i = 0; i < valuePairs.length; i++) {
      let result = callbackFn(valuePairs[i].key, valuePairs[i].value)
      if(result === false) {
        break
      }
    }
  }
  size() {
    return Object.keys(this.table).length
  }
  isEmpty() {
    return this.size() === 0
  }
  clear() {
    this.table = {}
  }
  toString() {
    if (this.isEmpty()) {
      return ''
    }
    let valuePairs = this.keyValues()
    let objString = `${valuePairs[0].toString()}`
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString},${valuePairs[i].toString()}`
      return objString
    }
  }
}