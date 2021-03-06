'use strict'

const fs = require('fs')
const input = './submitInput.txt'
const output = './submitOutput.txt'
const Graph = require('./dijkstras')

fs.unlink(output, err => err && console.error(err))

let t = 1
let index = 1

const inputFile = fs.readFileSync(input).toString().split('\n')
const c = +inputFile[0]

const translate = ({ vertices }, r) => r.reduce((x, y, i) =>
  x + (i < r.length - 1 ? vertices[y][r[i + 1]] : 0), 0)

while (t <= c && index < inputFile.length) {
  // First, read all variables
  let [f, s] = inputFile[index].split(' ')
  const shortcuts = {}
  while (s-- > 0) {
    index++
    const [a, b, y] = inputFile[index].split(' ').map(Number)
    // Watch out: don't take longer paths!
    if (shortcuts[a] && shortcuts[a][b] > y) {
      shortcuts[a][b] = y
    }
    shortcuts[a] = Object.assign({ [b]: y }, shortcuts[a])
  }

  // Second, create the graph
  const g = new Graph()
  for (let n = 1; n <= f; n++) {
    // Same here :)
    if (shortcuts[n] && shortcuts[n][n + 1] > n) {
      shortcuts[n][n + 1] = n
    }
    g.addVertex(n, Object.assign({ [n - 1]: 0, [n + 1]: n }, shortcuts[n]))
  }

  // Third, find shortest path
  const r = translate(g, g.shortestPath('1', f).concat('1').reverse())

  const result = `Case #${t}: ${r}`
  console.log(result)
  fs.appendFileSync(output, `${result}\n`)
  index++
  t++
}
