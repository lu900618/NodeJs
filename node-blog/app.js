const querystring = require('querystring')
const {get, set} = require('./src/db/redis')
const {access} = require('./src/utils/log')
const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')

// // session 数据
// const SESSION_DATA = {}

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

/**
 * 获取cookie的过期时间
 */
const getCookieExoires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

const serverHandle = (req, res) => {

  access(`${new Date().toISOString()}--${req.method}--${req.url}--${req.headers['user-agent']}`)

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

  // 解析 cookie
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  // console.log(cookieStr)
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const value = arr[1].trim()
    req.cookie[key] = value
  })
  // console.log(req.cookie)

  // // 解析session
  // let needSetCookie = false
  // let userId = req.cookie.userid
  // if (userId) {
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {}
  //   }
  // } else {
  //   needSetCookie = true
  //   userId = `${Date.now()}_${Math.random()}`
  //   SESSION_DATA[userId] = {}
  // }
  // req.session = SESSION_DATA[userId]

  let needSetCookie = false
  let userId = req.cookie.userid
  if (!userId) {
    needSetCookie = true
    userId = `${Date.now()}_${Math.random()}`
    // 初始化Redis中的session值
    set(userId, {})
  }
  // 获取session
  req.sessionId = userId
  get(req.sessionId).then(sessionData => {
    if (sessionData == null) {
      // 初始化Redis中的session值
      set(req.sessionId, {})
      // 设置session
      req.session = {}
    } else {
      req.session = sessionData
    }
    return getPostData(req)
  }).then(postData => {
    req.body = postData
    // const blogData = handleBlogRouter(req, res)
    // if (blogData) {
    //   res.end(JSON.stringify(blogData))
    //   return
    // }
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExoires()}`)
        }
        res.end(JSON.stringify(blogData))
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
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId};path=/;httpOnly;expires=${getCookieExoires()}`)
        }
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
