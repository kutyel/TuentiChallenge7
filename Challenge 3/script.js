'use strict'

const fs = require('fs')
const input = './submitInput.txt'
const output = './output.txt'
const { log2, ceil } = Math

fs.unlink(output, err => err && console.error(err))

let c = 0

fs.readFileSync(input).toString().split('\n').forEach((num, t) => {
  if (t === 0) {
    c = num
  } else if (t <= c) {
    const p = +num
    const r = ceil(log2(p))
    const result = `Case #${t}: ${r}`
    console.log(result)
    fs.appendFileSync(output, `${result}\n`)
  }
})
