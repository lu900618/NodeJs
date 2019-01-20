
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const mainCtrl = require('./controllers/mainCtrl')

// 连接数据库
mongoose.connect('mongodb://localhost/ElectiveCourseRegistrationSystem', { useNewUrlParser: true })

const app = express()
app.use(session({
  secret: 'ElectiveCourseRegistrationSystem',
  cookie: { maxAge: 9000 },
  resave: false,
  saveUninitialized: true
}))

// 模板引擎
app.set('view engine', 'ejs')

// 中间件
app.get('/', mainCtrl.showIndex)

// 静态资源文件
app.use(express.static('public'))

// 404页面
app.use((req, res) => {
  res.send('404 Not Found')
})

// 监听
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
