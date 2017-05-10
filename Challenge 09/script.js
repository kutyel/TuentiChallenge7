'use strict'

const fs = require('fs')
const input = './submitInput.txt'
const output = './submitOutput.txt'
const { trunc } = Math

fs.unlink(output, err => err && console.error(err))

function getScalextric (s, c, d) {
  let [x, y, z] = [0, trunc(c / 2) * 2, 0]
  // You need at least 4 corners to form a closed circuit
  if (y < 4) {
    y = 0
    x = 0
    z = 0
  } else if (y === 4) {
    x = trunc(s / 2) * 2
    z = s >= 2 ? d : trunc(d / 2) * 2
  } else if ((y - 2) % 4 === 0 && (s >= 2)) {
    x = trunc(s / 2) * 2
    z = d
  } else if (y === 8 && (s >= 2 || d >= 1)) {
    x = trunc(s / 2) * 2
    z = d
  } else if (y >= 12 && (y % 4 === 0)) {
    x = trunc(s / 2) * 2
    z = d
  } else {
    y -= 2
  }
  return y + x + z
}

fs.readFileSync(input).toString().split('\n').slice(1, -1).forEach((line, t) => {
  const [s, c, d] = line.split(' ').map(Number)
  const r = getScalextric(s, c, d)
  const result = `Case #${t + 1}: ${r}`
  console.log(result)
  fs.appendFileSync(output, `${result}\n`)
})
