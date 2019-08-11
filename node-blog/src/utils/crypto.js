const crypto = require('crypto')

const SECRET_KEY = 'qwertyuiopASDFGH789523!@#$%^'

function md5(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

function genPwd(password) {
  const str = `password=${password}&key=${SECRET_KEY}`
  return md5(str)
}

module.exports = {
  genPwd
}