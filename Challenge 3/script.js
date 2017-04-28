'use strict'

const fs = require('fs')
const input = './testInput.txt'
const output = './output.txt'

fs.unlink(output, err => err && console.error(err))

let c = 0

function findSmallestSubset (n) {
  const results = [1, 2, 3, 4, 5]
  return results[Math.floor(Math.random() * 4) + 1]
}

fs.readFileSync(input).toString().split('\n').forEach((num, t) => {
  if (t === 0) {
    c = num
  } else if (t <= c) {
    const p = +num
    const r = findSmallestSubset(p)

    const result = `Case #${t}: ${r}`
    console.log(result)
    fs.appendFileSync(output, `${result}\n`)
  }
})
