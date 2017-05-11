'use strict'

const fs = require('fs')
const input = './submitInput.txt'
const output = './submitOutput.txt'
const bigNumber = require('big-integer')
const { replaceDigits } = require('unicodedigits')

fs.unlink(output, err => err && console.error(err))

const stringToHex = s => {
  try {
    return bigNumber(replaceDigits(s)).toString(16)
  } catch (err) {
    return 'N/A'
  }
}

fs.readFileSync(input, 'utf16le').toString().split('\n').slice(1, -1).forEach((line, t) => {
  const r = stringToHex(line.trim())
  const result = `Case #${t + 1}: ${r}`
  console.log(result)
  fs.appendFileSync(output, `${result}\n`)
})
