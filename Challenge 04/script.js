'use strict'

const fs = require('fs')
const input = './testInput.txt'
const output = './output.txt'
const combinations = require('./combinations.js').kCombinations

fs.unlink(output, err => err && console.error(err))

let c = 0

function findSmallestTriangle (n) {
  let min = 0
  const combs = combinations(n, 3)
  for (let x of combs) {
    const [a, b, c] = x
    // Triangle inequality theory
    // a + b > c && b + c > a && a + c > b
    if (a + b > c && b + c > a && a + c > b) {
      if (a + b + c < min || !min) {
        min = a + b + c
      }
    }
  }
  return min || 'IMPOSSIBLE'
}

fs.readFileSync(input).toString().split('\n').forEach((line, t) => {
  if (t === 0) {
    c = line
  } else if (t <= c) {
    const sides = line.split(' ').map(Number).slice(1)
    const r = findSmallestTriangle(sides)
    const result = `Case #${t}: ${r}`
    console.log(result)
    fs.appendFileSync(output, `${result}\n`)
  }
})
