const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')

const serverHandle = (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  // const resData = {
  //   name: 'shuangyue101',
  //   site: 'immoccc',
  //   env: process.env.NODE_ENV
  // }

  // res.end(JSON.stringify(resData))
  const url = req.url
  req.path = url.split('?')[0]

  const blogData = handleBlogRouter(req, res)

  if (blogData) {
    res.end(JSON.stringify(blogData))
    return
  }

  const userData = handleUserRouter(req, res)
  if (userData) {
    res.end(JSON.stringify(userData))
    return
  }

  res.writeHead('404', {'Content-Type': 'text/plain'})
  res.write('404 NOT FONUD')
  res.end()
}

module.exports = serverHandle
