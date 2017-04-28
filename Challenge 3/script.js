'use strict'

const fs = require('fs')
const input = './testInput.txt'
const output = './output.txt'
const { sqrt, round } = Math

fs.unlink(output, err => err && console.error(err))

let c = 0

const subsetSum = n => round(sqrt(2 * n + 1 / 4) - 1 / 2)

fs.readFileSync(input).toString().split('\n').forEach((num, t) => {
  if (t === 0) {
    c = num
  } else if (t <= c) {
    const p = +num
    const r = subsetSum(p)
    const result = `Case #${t}: ${r}`
    console.log(result)
    fs.appendFileSync(output, `${result}\n`)
  }
})
