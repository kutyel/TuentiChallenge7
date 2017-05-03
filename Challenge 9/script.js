'use strict'

const fs = require('fs')
const input = './submitInput.txt'
const output = './output.txt'
const { trunc } = Math

fs.unlink(output, err => err && console.error(err))

let c = 0

function getScalextric (s, c, d) {
  // You need at least 4 corners to form a closed circuit
  if (c < 4) {
    return 0
  } else {
    const max = s + c + d
    // You need at least S*2 > D to close the circuit
    if (s >= d * 2 && d > 0) {
      return max - trunc(s % (d * 2))
    } else if (s === d && s < 4 && d < 2) {
      return 4
    } else if (d >= 4 && s >= d && d % 2 === 0) {
      return max - (s - d)
    }
    return max
  }
}

fs.readFileSync(input).toString().split('\n').forEach((line, t) => {
  if (t === 0) {
    c = line
  } else if (t <= c) {
    const [s, c, d] = line.split(' ').map(Number)
    const r = getScalextric(s, c, d)
    const result = `Case #${t}: ${r}`
    console.log(result)
    fs.appendFileSync(output, `${result}\n`)
  }
})
