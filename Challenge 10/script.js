'use strict'

const fs = require('fs')
const input = './testInput.txt'
const output = './output.txt'

fs.unlink(output, err => err && console.error(err))

let t = 1
let index = 1

const inputFile = fs.readFileSync(input).toString().split('\n')
const c = +inputFile[0]

while (t <= c && index < inputFile.length) {
  // First, read all variables
  let [userid, n] = inputFile[index].split(' ')
  const backups = {}

  while (n--) {
    index++
    const [d, c] = inputFile[index].split(' ')
    backups[d] = +c
  }

  // TODO: Second, execute the script with its corresponding version (using `node-git`)

  const r = userid

  const result = `Case #${t}: ${r}`
  console.log(result)
  fs.appendFileSync(output, `${result}\n`)
  index++
  t++
}
