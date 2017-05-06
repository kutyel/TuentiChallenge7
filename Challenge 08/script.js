'use strict'

const fs = require('fs')
const input = './submitInput.txt'
const output = './submitOutput.txt'
const bigNumber = require('big-integer')
const { replaceDigits } = require('unicodedigits')

fs.unlink(output, err => err && console.error(err))

let c = 0

const stringToHex = s => {
  try {
    return bigNumber(replaceDigits(s)).toString(16)
  } catch (err) {
    return 'N/A'
  }
}

fs.readFileSync(input, 'utf16le').toString().split('\n').forEach((line, t) => {
  if (t === 0) {
    c = Number(replaceDigits(line))
  } else if (t <= c) {
    const r = stringToHex(line.trim())
    const result = `Case #${t}: ${r}`
    console.log(result)
    fs.appendFileSync(output, `${result}\n`)
  }
})
