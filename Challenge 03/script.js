'use strict'

const fs = require('fs')
const miss = require('mississippi')

const { log2, ceil } = Math
const read = fs.createReadStream('./submitInput.txt')
const write = fs.createWriteStream('./submitOutput.txt')

let test = 1

const calc = miss.through((chunk, enc, cb) => {
  const num = Number(chunk.toString())
  const result = ceil(log2(num))
  test++

  return cb(null, `Case #${test}: ${result}`)
})

miss.pipe(read, calc, write, err => {
  if (err) return console.error(`FATAL ERROR: ${err}`)
  console.log('Success! 🎉')
})
