const fs = require('fs')
const path = require('path')
const math = require('./math')

const baseUrl = './data'

exports.read = (number, callback) => {
  fs.readFile(path.join(baseUrl, number), (err, data) => {
    if (err) {
      callback(err)
      return
    }
    callback(null, JSON.parse(data))
  })
}

exports.write = (number, data, callback) => {
  fs.writeFile(path.join(baseUrl, number), JSON.stringify(data), callback)
}
