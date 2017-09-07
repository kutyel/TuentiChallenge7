'use strict'

const fs = require('fs')
const input = './submitInput.txt'
const output = './submitOutput.txt'

fs.unlink(output, err => err && console.error(err))

const file = fs
  .readFileSync(input)
  .toString()
  .split('\n')
const cases = +file[0]

let t = 1
let r = []
let i = 2
let roll = 1
let frame = 1
let index = 0
let points = 0
let partial = 0

while (t <= cases && i < file.length) {
  const scores = file[i].split(' ').map(Number)

  while (frame < 10) {
    const score = scores[index]
    // strike
    if (score === 10 && roll === 1) {
      points += score + scores[index + 1] + scores[index + 2]
      r.push(points)
      frame++
    } else {
      points += score
      if (roll === 1) {
        partial = score
      }
      if (roll === 2) {
        // spare
        if (partial + score === 10) {
          points += scores[index + 1]
        }
        r.push(points)
        partial = 0
        roll = 1
        frame++
      } else {
        roll++
      }
    }
    index++
  }
  // frame 10
  r.push((points += scores.slice(index).reduce((a, b) => a + b, 0)))

  const result = `Case #${t}: ${r.join(' ')}`
  console.log(result)
  fs.appendFileSync(output, `${result}\n`)
  r.length = 0
  points = 0
  index = 0
  frame = 1
  i += 2
  t++
}
