const env = process.env.NODE_ENV

let MYSQL_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'myblog'
  }
}


if (env === 'prd') {
  MYSQL_CONF = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    datebase: 'myblog'
  }
}

module.exports = {
  MYSQL_CONF
}