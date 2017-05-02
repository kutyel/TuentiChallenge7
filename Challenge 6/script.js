'use strict'

const fs = require('fs')
const input = './testInput.txt'
const output = './output.txt'
const Graph = require('./dijkstras')

fs.unlink(output, err => err && console.error(err))

let t = 1
let r = 0
let index = 1

const inputFile = fs.readFileSync(input).toString().split('\n')
const c = +inputFile[0]

const translate = ({ vertices }, r) => r.reduce((x, y, i) =>
  x + (i < r.length - 1 ? vertices[y][r[i + 1]] : 0), 0)

while (t <= c && index < inputFile.length) {
  // First, read all variables
  let [f, s] = inputFile[index].split(' ')
  const shortcuts = {}
  while (+s > 0) {
    index++
    const [a, b, y] = inputFile[index].split(' ').map(Number)
    shortcuts[a] = { [b]: y }
    s--
  }

  // Second, create the graph
  const g = new Graph()
  for (let i = 1; i <= f; i++) {
    g.addVertex(i, Object.assign({ [i - 1]: 0, [i + 1]: i }, shortcuts[i]))
  }

  // Third, find shortest path
  r = translate(g, g.shortestPath('1', f).concat('1').reverse())

  const result = `Case #${t}: ${r}`
  console.log(result)
  fs.appendFileSync(output, `${result}\n`)
  index++
  t++
}
