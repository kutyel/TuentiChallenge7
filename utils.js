const fs = require('fs')
const Task = require('data.task')

const cb = (rej, res) => (err, data) => (err ? rej(err) : res(data))

const read = (name, enc = 'utf-8') =>
  new Task((rej, res) => fs.readFile(name, enc, cb(rej, res)))

const write = name => data =>
  new Task((rej, res) => fs.writeFile(name, data, cb(rej, res)))

module.exports = { read, write }
