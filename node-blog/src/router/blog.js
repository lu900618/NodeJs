const {getList, getDetail, newBlog, updateBlog, deleteBlog} = require('../controller/blog')
const {SuccessModel, ErrorModel} = require('../model/BaseModel')

const handleBlogRouter = (req, res) => {
  const method = req.method
  const path = req.path
  let id = req.query.id

  if (method === 'GET' && path === '/api/blog/list') {
    const {author = '', keyword = ''} = req.query
    let listData = getList(author, keyword)
    return new SuccessModel(listData)
  }

  if (method === 'GET' && path === '/api/blog/detail') {
    let detailData = getDetail(id)
    return new SuccessModel(detailData)
  }

  if (method === 'POST' && path === '/api/blog/new') {
    let rs = newBlog(req.body)
    return new SuccessModel(rs)
  }

  if (method === 'POST' && path === '/api/blog/update') {
    let rs = updateBlog(id, req.body)
    if (rs) {
      return new SuccessModel()
    } else {
      return new ErrorModel('更新博客失败')
    }
  }

  if (method === 'POST' && path === '/api/blog/delete') {
    let rs = deleteBlog(id)
    if (rs) {
      return new SuccessModel()
    } else {
      return new ErrorModel('删除博客失败')
    }
  }
}

module.exports = handleBlogRouter
