'use strict'

const fs = require('fs')
const input = './testInput.txt'
const output = './output.txt'

fs.unlink(output, err => err && console.error(err))

let c = 0

function findSmallestTriangle (n) {
  let min = 0
  for (let a = 0; a < n.length - 2; a += 3) {
    for (let b = 1; b < n.length - 1; b += 3) {
      for (let c = 2; c < n.length; c += 3) {
        // Triangle inequality theory
        // a + b > c && b + c > a && a + c > b
        if (n[a] + n[b] > n[c] && n[b] + n[c] > n[a] && n[a] + n[c] > n[b]) {
          if (n[a] + n[b] + n[c] < min || !min) {
            min = n[a] + n[b] + n[c]
          }
        }
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
