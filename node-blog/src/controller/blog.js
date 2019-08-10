

const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: 'title1',
      content: 'lorem6',
      createTime: Date.now(),
      author: 'zhangsan'
    },
    {
      id: 2,
      title: 'title2',
      content: 'lorem2',
      createTime: Date.now() - 1233451,
      author: 'zhanglisian'
    }
  ]
}

const getDetail = id => {
  return {
    id: 1,
    title: 'title1',
    content: 'lorem6',
    createTime: Date.now(),
    author: 'zhangsan'
  }
}

const newBlog = (blogData = {}) => {
  return {
    id: 5
  }
}

const updateBlog = (id, blogData = {}) => {
  return true
}

const deleteBlog = (id) => {
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}
