const mysql = require('mysql')
const {MYSQL_CONF} = require('../config/db')

const con = mysql.createConnection(MYSQL_CONF)

con.connect()

function exec(sql){
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, rs) => {
      if (err) {
        reject(err)
        return
      }
      resolve(rs)
    })
  })
  return promise
}

module.exports = {
  exec
}