const {exec, escape} = require('../db/mysql')
const {genPwd} = require('../utils/crypto')

let sql = ''

const login = (username, password) => {
  username = escape(username)
  password = genPwd(escape(password))
  sql = `select username, realname from users where username = ${username} and password = '${password}'`
  return exec(sql).then(rows => {
    return rows[0] || {}
  })
}

module.exports = {
  login
}