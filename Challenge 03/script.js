'use strict'

const fs = require('fs')
const byline = require('byline')

const { log2, ceil } = Math
const read = fs.createReadStream('./submitInput.txt')
const write = fs.createWriteStream('./submitOutput.txt')
const stream = byline.createStream(read)

let test = 0

stream.on('data', line => {
  if (test > 0) {
    const num = Number(line.toString())
    const result = ceil(log2(num))

    write.write(`Case #${test}: ${result}\n`)
  }
  test++
})

stream.on('end', () => console.log('Success! 🎉'))
