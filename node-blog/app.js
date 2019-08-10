const querystring = require('querystring')
const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')

/**
 * 用于处理 post data
 * @param {y} req
 */
const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = Buffer.alloc(0)
    req.on('data', chunk => {
      postData = Buffer.concat([postData, chunk], postData.length + chunk.length)
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData.toString()))
    })
  })
  return promise
}

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
  req.query = querystring.parse(url.split('?')[1])

  getPostData(req).then(postData => {
    req.body = postData
    // const blogData = handleBlogRouter(req, res)
    // if (blogData) {
    //   res.end(JSON.stringify(blogData))
    //   return
    // }
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        if (blogData) {
          res.end(JSON.stringify(blogData))
        }
      })
      return
    }

    // const userData = handleUserRouter(req, res)
    // if (userData) {
    //   res.end(JSON.stringify(userData))
    //   return
    // }
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        console.log(userData)
        res.end(JSON.stringify(userData))
      })
      return
    }

    res.writeHead('404', {'Content-Type': 'text/plain'})
    res.write('404 NOT FONUD')
    res.end()
  })
}

module.exports = serverHandle
