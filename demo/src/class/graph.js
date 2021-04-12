import Dictionary from './dictionary'
import Queue from './queue'

class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected
    this.vertices = []
    this.adjList = new Dictionary()
  }

  addVertex(v) {
    if(!this.vertices.includes(v)) {
      this.vertices.push(v)
      this.adjList.set(v, [])
    }
  }

  addEdge(v, w) {
    if(!this.adjList.get(v)) {
      this.addVertex(v)
    }
    if(!this.adjList.get(w)) {
      this.addVertex(w)
    }
    this.adjList.get(v).push(w)
    if(!this.isDirected) {
      this.adjList.get(w).push(v)
    }
  }
  
  getVertices() {
    return this.vertices
  }

  getAdjList() {
    return this.adjList
  }

  toString() {
    let s = ''
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `
      const neighbors = this.adjList.get(this.vertices[i])
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]} `
      }
      s += '\n'
    }
    return s
  }
}

const Colors = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2
}
const initializeColor = vertices => {
  const color = {}
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE
  }
  return color
}

//广度优先搜索
const breadthFirstSearch = (graph, startVertex, callback) => {
  let vertices = graph.getVertices()
  let adjList = graph.getAdjList()
  let color = initializeColor(vertices)
  let queue = new Queue()

  queue.enqueue(startVertex)
  while(!queue.isEmpty()) {
    let u = queue.dequeue()
    let neighbors = adjList.get(u)
    color[u] = Colors.GREY
    for(let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i]
      if(color[w] === Colors.WHITE) {
        color[w] = Colors.GREY
        queue.enqueue(w)
      }
    }
    color[u] = Colors.BLACK
    if(callback) {
      callback(u)
    }
  }
}

const BFS = (graph, startVertex) => {
  let vertices = graph.getVertices()
  let adjList = graph.getAdjList()
  let color = initializeColor(vertices)
  let queue = new Queue()
  let distances = {}
  let predecessors = {}
  queue.enqueue(startVertex)

  for(let i = 0; i < vertices.length; i ++) {
    distances[vertices[i]] = 0
    predecessors[vertices[i]] = null
  }

  while(!queue.isEmpty()) {
    let u = queue.dequeue()
    let neighbors = adjList.get(u)
    color[u] = Colors.GREY
    for(let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i]
      if(color(w) === Colors.WHITE) {
        color[w] = Colors.GREY
        distances[w] = distances[u] + 1
        predecessors[w] = u
        queue.enqueue(w)
      }
    }
    color[u] = Colors.BLACK
  }
  return {
    distances,
    predecessors
  }
}

//深度优先搜索
const depthFirstSearch = (graph, callback) => {
  let vertices = graph.getVertices()
  let adjList = graph.getAdjList()
  let color = initializeColor(vertices)

  for(let i = 0; i < vertices.length; i++) {
    if(color[vertices[i]] === Colors.WHITE) {
      depthFirstSearchVisit(vertices[i], color, adjList, callback)
    }
  }
}
const depthFirstSearchVisit = (u, color, adjList, callback) => {
  color[u] = Colors.GREY
  if(callback) {
    callback(u)
  }
  let neighbors = adjList.get(u)
  for(let i = 0; i < neighbors.length; i++) {
    let w = neighbors[i]
    if(color[w] === Colors.WHITE) {
      depthFirstSearchVisit(w, color, adjList, callback)
    }
  }
  color[u] = Colors.BLACK
}

const DFS = graph => {
  let vertices = graph.getVertices()
  let adjList = graph.getAdjList()
  let color = initializeColor(vertices)
  let d = {}
  let f = {}
  let p = {}
  let time = { count: 0 }
  for(let i = 0; i < vertices.length; i++) {
    f[vertices[i]] = 0
    d[vertices[i]] = 0
    p[vertices[i]] = 0
  }
  for(let i = 0; i < vertices.length; i++) {
    if(color[vertices[i]] === Colors.WHITE) {
      depthFirstSearchVisit(vertices[i], color, d, f, p, time, adjList)
    }
  }
  return {
    discovery: d,
    finished: f,
    predecessors: p
  }
}
const DFSVisit = (u, color, d, f, p, time, adjList) => {
  color[u] = Colors.GREY
  d[u] = ++time.count
  let neighbors = adjList.get(u)
  for(let i = 0; i < neighbors.length; i++) {
    let w = neighbors[i]
    if(color[w] === Colors.WHITE) {
      p[w] = u
      DFSVisit(w, color, d, f, p, time, adjList)
    }
  }
  color[u] = Colors.BLACK
  f[u] = ++time.count
}