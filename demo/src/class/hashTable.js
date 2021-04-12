import {defaultToString} from '../utils/util'
import {ValuePair} from '../modules/valuePair'

//散列表
export default class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  //lose lose散列函数
  loseloseHashCode(key) {
    if(typeof key === 'number') {
      return key
    }
    let tableKey = this.toStrFn(key)
    let hash = 0
    for(let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i)
    }
    return hash % 37
  }

  //djb2散列函数
  djb2HashCode(key) {
    let tableKey = this.toStrFn(key)
    let hash = 5381
    for (let i = 0; i < tableKey.length; i++) {
      hash = (hash * 33) + tableKey.charCodeAt(i)
    }
    return hash % 1013
  }

  hashCode(key) {
    return this.djb2HashCode(key)
  }

  put(key, value) {
    if(key != null && value != null) {
      let position = this.hashCode(key)
      this.table[position] = new ValuePair(key, value)
      return true
    }
    return false
  }

  get(key) {
    let valuePair = this.table[this.hashCode(key)]
    return valuePair == null ? undefined : valuePair.value
  }

  remove(key) {
    let hash = this.hashCode(key)
    let valuePair = this.table[hash]
    if(valuePair != null) {
      delete this.table[hash]
      return true
    }
    return false
  }

  getTable() {
    return this.table
  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    return Object.keys(this.table).length
  }

  clear() {
    this.table = {}
  }

  toString() {
    if(this.isEmpty()) {
      return ''
    }
    let keys = Object.keys(this.table)
    let objString = `${keys[0]} => ${this.table[keys[0]].toString()}`
    for(let i = 0; i < keys.length; i++) {
      objString = `${objString}, ${keys[i]} => ${this.table[keys[i]].toString()}`
    }
    return objString
  }
}