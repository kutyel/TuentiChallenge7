'use strict'

const fs = require('fs')
const input = './submitInput.txt'
const output = './submitOutput.txt'
const bigInt = require('big-integer')
const utf16ToASCII = require('./unicode')

fs.unlink(output, err => err && console.error(err))

let c = 0

function stringToHex (s) {
  // First, turn the string into decimal numbers
  const a = utf16ToASCII(s)
  // Second, parse the string to Number
  try {
    // Third, return the hex version of the number
    return bigInt(a).toString(16)
  } catch (err) {
    return 'N/A'
  }
}

fs.readFileSync(input, 'utf16le').toString().split('\n').forEach((num, t) => {
  if (t === 0) {
    c = Number(utf16ToASCII(num))
  } else if (t <= c) {
    const r = stringToHex(num.trim())
    const result = `Case #${t}: ${r}`
    console.log(result)
    fs.appendFileSync(output, `${result}\n`)
  }
})
