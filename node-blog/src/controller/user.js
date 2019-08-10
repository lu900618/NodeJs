const {exec} = require('../db/mysql')

let sql = ''

const login = (username, password) => {
  sql = `select username, realname from users where username = '${username}' and password = '${password}'`
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

module.exports = {
  login
}