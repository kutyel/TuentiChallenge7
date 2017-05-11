'use strict'

const fs = require('fs')
const input = './testInput.txt'
const output = './testOutput.txt'
const combinations = require('./combinations.js').kCombinations

fs.unlink(output, err => err && console.error(err))

function findSmallestTriangle (n) {
  let min = 0
  const combs = combinations(n, 3)
  for (let x of combs) {
    const [a, b, c] = x
    // Triangle inequality theory
    if (a + b > c && b + c > a && a + c > b) {
      if (a + b + c < min || !min) {
        min = a + b + c
      }
    }
  }
  return min || 'IMPOSSIBLE'
}

fs.readFileSync(input).toString().split('\n').slice(1, -1).forEach((line, t) => {
  const sides = line.split(' ').map(Number).slice(1)
  const r = findSmallestTriangle(sides)
  const result = `Case #${t + 1}: ${r}`
  console.log(result)
  fs.appendFileSync(output, `${result}\n`)
})
