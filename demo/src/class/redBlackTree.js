import BinarySearchTree from './binarySearchTree'
import {Compare, defaultCompare, BalanceFactor, Colors} from '../utils/util'
import {RedBlackNode} from '../modules/treeNode'

//红黑树
/*
(1) 顾名思义，每个节点不是红的就是黑的;
(2) 树的根节点是黑的;
(3) 所有叶节点都是黑的(用 NULL 引用表示的节点);
(4) 如果一个节点是红的，那么它的两个子节点都是黑的;
(5) 不能有两个相邻的红节点，一个红节点不能有红的父节点或子节点;
(6) 从给定的节点到它的后代节点(NULL 叶节点)的所有路径包含相同数量的黑色节点。
*/
export default class RedBlackTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn)
    this.compareFn = compareFn
    this.root = null
  }

  insert(key) {
    if(this.root == null) {
      this.root = new RedBlackNode(key)
      this.root.color = Colors.BLACK
    }else {
      let newNode = this.insertNode(this.root, key)
      this.fixTreeProperties(newNode)
    }
  }
  insertNode(node, key) {
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if(node.left == null) {
        node.left = new RedBlackNode(key)
        node.left.parent = node
        return node.left
      }else {
        return this.insertNode(node.left, key)
      }
    }else if(node.right == null) {
      node.right = new RedBlackNode(key)
      node.right.parent = node
      return node.right
    }else {
      return this.insertNode(node.right, key)
    }
  }
  //验证并修复红黑树属性
  /*
  左-左(LL):父节点是祖父节点的左侧子节点，节点是父节点的左侧子节点(情形 3A)。
  左-右(LR):父节点是祖父节点的左侧子节点，节点是父节点的右侧子节点(情形 2A)。 
  右-右(RR):父节点是祖父节点的右侧子节点，节点是父节点的右侧子节点(情形 2A)。
  右-左(RL):父节点是祖父节点的右侧子节点，节点是父节点的左侧子节点(情形 2A)。
  */
  fixTreeProperties(node) {
    while(node && node.parent && node.parent.isRed() && node.color !== Colors.BLACK) {
      let parent = node.parent
      let grandParent = parent.parent
      //情形A：父节点是左侧子节点
      if(grandParent && grandParent.left === parent) {
        let uncle = grandParent.right
        //情形1A：叔节点也是红色，只需要重新填色
        if(uncle && uncle.color === Colors.RED) {
          grandParent.color = Colors.RED
          parent.color = Colors.BLACK
          uncle.color = Colors.BLACK
          node = grandParent
        }else {
          // 情形2A:节点是右侧子节点——左旋转
          if(node === parent.right) {
            this.rotationRR(parent)
            node = parent
            parent = node.parent
          }
          // 情形3A:节点是左侧子节点——右旋转
          this.rotationLL(grandParent)
          parent.color = Colors.BLACK
          grandParent.color = Colors.RED
          node = parent
        }
      }else {
        //情形B:父节点是右侧子节点
        let uncle = grandParent.left
        //情形1B:叔节点是红色——只需要重新填色
        if(uncle && uncle.color === Colors.RED) {
          grandParent.color = Colors.RED
          parent.color = Colors.BLACK
          uncle.color = Colors.BLACK
          node = grandParent
        }else {
          // 情形2B:节点是左侧子节点——右旋转 
          if(node === parent.left) {
            this.rotationLL(parent)
            node = parent
            parent = node.parent
          }
          // 情形3B:节点是右侧子节点——左旋转
          this.rotationRR(grandParent)
          parent.color = Colors.BLACK
          grandParent.color = Colors.RED
          node = parent
        }
      }
    }
    this.root.color = Colors.BLACK
  }

  //红黑树旋转
  //左-左（LL）：向右的单旋转
  rotationLL(node) {
    let tmp = node.left
    node.left = tmp.right
    if(tmp.right && tmp.right.key) {
      tmp.right.parent = node
    }
    tmp.parent = node.parent
    if(!node.parent) {
      this.root = tmp
    }else {
      if(node === node.parent.left) {
        node.parent.left = tmp
      }else {
        node.parent.right = tmp
      }
    }
    tmp.right = node
    node.parent = tmp
  }
  //右-右(RR)：向左的单旋转
  rotationRR(node) {
    let tmp = node.right
    node.right = tmp.left
    if(tmp.left && tmp.left.key) {
      tmp.left.parent = node
    }
    tmp.parent = node.parent
    if(!node.parent) {
      this.root = tmp
    }else {
      if(node === node.parent.left) {
        node.parent.left = tmp
      }else {
        node.parent.right = tmp
      }
    }
    tmp.left = node
    node.parent = tmp
  }
}