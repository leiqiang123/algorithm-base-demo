import {defaultToString} from '../utils/util'
import {ValuePair} from '../modules/valuePair'
import LinkedList from './linkedList'

//散列表--分离链接  
export default class HashTableSeparateChaining {
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
      if(this.table[position] == null) {
        this.table[position] = new LinkedList()
      }
      this.table[position].push(new ValuePair(key, value))
      return true
    }
    return false
  }

  get(key) {
    let position = this.hashCode(key)
    let linkedList = this.table[position]
    if(linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead()
      while(current != null) {
        if(current.element.key === key) {
          return current.element.value
        }
        current = current.next
      }
    }
    return undefined
  }

  remove(key) {
    let position = this.hashCode(key)
    let linkedList = this.table(position)
    if(linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead()
      while(current != null) {
        if(current.element.key === key) {
          linkedList.remove(current.element)
          if(linkedList.isEmpty()) {
            delete this.table[position]
          }
          return true
        }
        current = current.next
      }
    }
    return false
  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    let count = 0
    Object.values(this.table).forEach(linkedList => {
      count += linkedList.size()
    })
    return count
  }

  clear() {
    this.table = {}
  }

  getTable() {
    return this.table
  }

  toString() {
    if (this.isEmpty()) {
      return ''
    }
    let keys = Object.keys(this.table)
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[keys[i]].toString()}}`
    }
    return objString
  }
}