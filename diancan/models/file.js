const fs = require('fs')
const path = require('path')

let baseUrl = './data'

exports.save = (mobile, name, callback) => {
  fs.writeFile(path.join(baseUrl, mobile), name, (err, data) => {
    if (err) callback(err)
    else callback(null, data)
  })
}

exports.queryList = callback => {
  fs.readdir(baseUrl, (err, data) => {
    if (err) callback(err)
    else callback(null, data)
  })
}

exports.read = (mobile, callback) => {
  fs.readFile(path.join(baseUrl, mobile), (err, data) => {
    if (err) callback(err)
    else callback(null, data)
  })
}
