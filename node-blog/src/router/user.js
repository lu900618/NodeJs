const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/BaseModel')

const handleUserRouter = (req, res) => {
  const method = req.method
  const path = req.path

  if (method === 'POST' && path === '/api/user/login') {
    const {username, password} = req.body
    const result = login(username, password)
    return result.then(data => {
      if (data.username) {
        return new SuccessModel()
      }
      return new ErrorModel('用户登录失败')
    })
  }
}

module.exports = handleUserRouter
