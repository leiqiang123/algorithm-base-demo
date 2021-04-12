import BinarySearchTree from './binarySearchTree'
import {Compare, defaultCompare, BalanceFactor} from '../utils/util'

//AVL树---- Adelson-Velskii-Landi ---- 自平衡树
export default class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn)
    this.compareFn = compareFn
    this.root = null
  }

  //计算节点高度
  getNodeHeight(node) {
    if(node == null) {
      return -1
    }
    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1
  }
  //计算一个节点的平衡因子并返回其值
  getBalanceFactor(node) {
    let heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
    switch(heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      case 2:
        return BalanceFactor.UNBALANCED_LEFT
      default:
        return BalanceFactor.BALANCED
    }
  }
  //左-左（LL）：向右的单旋转
  //出现于节点的左侧子节点的高度大于右侧子节点的高度时，并且左侧子节点也是平衡或左侧较重的
  rotationLL(node) {
    let tmp = node.left
    node.left = tmp.right
    tmp.right = node
    return tmp
  }
  //右-右(RR)：向左的单旋转
  //出现于右侧子节点的高度大于左侧子节点的高度，并且右侧子节点也是平衡或右侧较重的
  rotationRR(node) {
    let tmp = node.right
    node.right = tmp.left
    tmp.left = node
    return tmp
  }
  //左-右(LR)：向右的双旋转
  //出现于左侧子节点的高度大于右侧子节点的高度，并且左侧子节点右侧较重
  rotationLR(node) {
    node.left = this.rotationRR(node.left)
    return this.rotationLL(node)
  }
  //右-左(RL)：向左的双旋转
  //出现于右侧子节点的高度大于左侧子节点的高度，并且右侧子节点左侧较重
  rotationRL(node) {
    node.right = this.rotationLL(node.right)
    return this.rotationRR(node)
  }

  //插入
  insert(key) {
    this.root = this.insertNode(this.root, key)
  }
  insertNode(node, key) {
    if(node == null) {
      return new Node(key)
    }else if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key)
    }else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(ndoe.right, key)
    }else {
      //重复的键
      return node
    }
    //如果需要平衡，将树进行平衡操作
    let balanceFactor = this.getBalanceFactor(node)
    if(balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if(this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        node = this.rotationLL(node)
      }else {
        return this.rotationLR(node)
      }
    }
    if(balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if(this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        node = this.rotationRR(node)
      }else {
        return this.rotationRL(node)
      }
    }
    return node
  }

  removeNode(node, key) {
    node = super.removeNode(node, key)
    if(node == null) {
      return node
    }
    //检测树是否平衡
    let balanceFactor = this.getBalanceFactor(node)
    if(balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      let balanceFactorLeft = this.getBalanceFactor(node.left)
      if(balanceFactorLeft === BalanceFactor.BALANCED || balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationLL(node)
      }
      if(balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationLR(node.left)
      }
    }
    if(balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      let balanceFactorRight = this.getBalanceFactor(node.right)
      if(balanceFactorRight === BalanceFactor.BALANCED || balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        return this.rotationRR(node)
      }
      if(balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        return this.rotationRL(node.right)
      }
    }
    return node
  }
}