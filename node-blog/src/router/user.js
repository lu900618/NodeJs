const handleUserRouter = (req, res) => {
  const method = req.method
  const path = req.path

  if (method === 'POST' && path === '/api/user/login') {
    return {
      msg: '这是用户登录的接口'
    }
  }
}

module.exports = handleUserRouter
