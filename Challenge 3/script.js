'use strict'

const fs = require('fs')
const input = './test.txt'
const output = './output.txt'

fs.unlink(output, err => err && console.error(err))

let c = 0

const sum = x => x.reduce((y, z) => y + z, 0)
const range = x => Array.from(Array(x).keys()).map(y => y + 1)

const subsetSum = (numbers, target, partial = []) => {
  const s = sum(partial)

  if (s === target) {
    console.log(`${partial.join('+')}=${target}`)
  }

  if (s >= target) { return }

  numbers.forEach((n, i) => subsetSum(numbers.slice(i + 1), target, partial.concat([n])))
}

fs.readFileSync(input).toString().split('\n').forEach((num, t) => {
  if (t === 0) {
    c = num
  } else if (t <= c) {
    const p = +num
    const r = subsetSum(range(p), p)
    const result = `Case #${t}: ${r}`
    console.log(result)
    fs.appendFileSync(output, `${result}\n`)
  }
})
