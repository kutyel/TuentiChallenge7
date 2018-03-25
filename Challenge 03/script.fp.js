const { compose } = require('ramda')
const { read, write } = require('../utils')
const { log2, ceil } = Math

const app = read('testInput.txt')
  .skip(1)
  .map(compose(ceil, log2, Number))
  .map((res, test) => `Case #${test}: ${res}`)
  .chain(write('testOutput.txt'))

app.fork(console.error, () => console.log('Success! 🎉'))
