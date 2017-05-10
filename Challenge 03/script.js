'use strict'

const fs = require('fs')
const input = './submitInput.txt'
const output = './submitOutput.txt'
const { log2, ceil } = Math

fs.unlink(output, err => err && console.error(err))

fs.readFileSync(input).toString().split('\n').slice(1, -1).forEach((num, t) => {
  const r = ceil(log2(+num))
  const result = `Case #${t + 1}: ${r}`
  console.log(result)
  fs.appendFileSync(output, `${result}\n`)
})
