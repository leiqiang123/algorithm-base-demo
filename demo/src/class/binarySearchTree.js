import {Compare, defaultCompare} from '../utils/util'
import {Node} from '../modules/treeNode'

export default class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this,compareFn = compareFn //用来比较节点值
    this.root = null // Node 类型的根节点
  }

  /*
    insert(key):向树中插入一个新的键。
    search(key):在树中查找一个键。如果节点存在，则返回 true;如果不存在，则返回false。
    inOrderTraverse():通过中序遍历方式遍历所有节点。
    preOrderTraverse():通过先序遍历方式遍历所有节点。
    postOrderTraverse():通过后序遍历方式遍历所有节点。
    min():返回树中最小的值/键。
    max():返回树中最大的值/键。
    remove(key):从树中移除某个键。
  */
  insert(key) {
    if(this.root == null) {
      this.root = new Node(key)
    }else {
      this.insertNode(this.root, key)
    }
  }
  insertNode(node, key) {
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if(node.left == null) {
        node.left = new Node(key)
      }else {
        this.insertNode(node.left, key)
      }
    }else {
      if(node.right == null) {
        node.right = new Node(key)
      }else {
        this.insertNode(node.right, key)
      }
    }
  }

  //中序遍历
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback)
  }
  inOrderTraverseNode(node, callback) {
    if(node != null) {
      this.inOrderTraverseNode(node.left, callback)
      callback(node.key)
      this.inOrderTraverseNode(node.right, callback)
    }
  }

  //先序遍历
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback)
  }
  preOrderTraverseNode(node, callback) {
    if(node != null) {
      callback(node.key)
      this.preOrderTraverseNode(node.left, callback)
      this.preOrderTraverseNode(node.right, callback)
    }
  }

  //后序遍历
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback)
  }
  postOrderTraverseNode(node, callback) {
    if(node != null) {
      this.postOrderTraverseNode(node.left, callback)
      this.postOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }

  min() {
    return this.minNode(this.root)
  }
  minNode(node) {
    let current = node
    while(current != null && current.left != null) {
      current = current.left
    }
    return current
  }

  max() {
    return this.maxNode(this.root)
  }
  maxNode(node) {
    let current = node
    while(current != null && current.right != null) {
      current = current.right
    }
    return current
  }

  search(key) {
    return this.searchNode(this.root, key)
  }
  searchNode(node, key) {
    if(node == null) {
      return false
    }
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key)
    }else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key)
    }else {
      return true
    }
  }

  remove(key) {
    this.root = this.removeNode(this.root, key)
  }
  removeNode(node, key) {
    if(node == null) {
      return null
    }
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key)
      return node
    }else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key)
      return node
    }else {
      if(node.left == null && node.right == null) {
        node = null
        return node
      }
      if(node.left == null) {
        node = node.right
        return node
      }else if(node.right == null) {
        node = node.left
        return node
      }
      let aux = this.minNode(node.right)
      node.key = aux.key
      node.right = this.removeNode(node.right, aux.key)
      return node
    }
  }
}