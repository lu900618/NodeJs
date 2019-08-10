const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/BaseModel')

const handleBlogRouter = (req, res) => {
  const method = req.method
  const path = req.path
  let id = req.query.id

  if (method === 'GET' && path === '/api/blog/list') {
    const {author = '', keyword = ''} = req.query
    // let listData = getList(author, keyword)
    // return new SuccessModel(listData)
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

  if (method === 'GET' && path === '/api/blog/detail') {
    const result = getDetail(id)
    return result.then(detailData => {
      return new SuccessModel(detailData)
    })
  }

  if (method === 'POST' && path === '/api/blog/new') {
    req.body.author = 'zhangsan'
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  if (method === 'POST' && path === '/api/blog/update') {
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
    let author = 'zhangsan'
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
