'use strict'

const fs = require('fs')
const input = './submitInput.txt'
const output = './output.txt'

fs.unlink(output)

let t = 1
let r = 0
let index = 2

const inputFile = fs.readFileSync(input).toString().split('\n')
const cases = +inputFile[0]

while (t <= cases && index < inputFile.length) {
  const total = inputFile[index]
    .split(' ')
    .map(Number)
    .reduce((x, y) => x + y, 0)

  r = Math.trunc(total / 8) + (total % 8 === 0 ? 0 : 1)

  const result = `Case #${t}: ${r}`
  console.log(result)
  fs.appendFileSync(output, result + '\n')
  t++
  index += 2
}
