const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/BaseModel')

// 登录验证函数
const loginCheck = req => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method
  const path = req.path
  let id = req.query.id

  if (method === 'GET' && path === '/api/blog/list') {
    // 如果 loginCheck 有返回，说明为登录
    let loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }
    const {author = '', keyword = ''} = req.query
    // let listData = getList(author, keyword)
    // return new SuccessModel(listData)
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

  if (method === 'GET' && path === '/api/blog/detail') {
    // 如果 loginCheck 有返回，说明为登录
    let loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }
    const result = getDetail(id)
    return result.then(detailData => {
      return new SuccessModel(detailData)
    })
  }

  if (method === 'POST' && path === '/api/blog/new') {
    // 如果 loginCheck 有返回，说明为登录
    let loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  if (method === 'POST' && path === '/api/blog/update') {
    // 如果 loginCheck 有返回，说明为登录
    let loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }
    const result = updateBlog(id, req.body)
    return result.then(rs => {
      if (rs) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新博客失败')
      }
    })
  }

  if (method === 'POST' && path === '/api/blog/delete') {
    // 如果 loginCheck 有返回，说明为登录
    let loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      return loginCheckResult
    }
    let author = req.session.username
    const result = deleteBlog(id, author)
    return result.then(rs => {
      if (rs) {
        return new SuccessModel()
      } else {
        return new ErrorModel('删除博客失败')
      }
    })
  }
}

module.exports = handleBlogRouter
