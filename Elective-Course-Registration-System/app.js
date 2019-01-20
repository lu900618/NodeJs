
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const mainCtrl = require('./controllers/adminCtrl')

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
app.get('/admin', mainCtrl.showAdminDashboard)
app.get('/admin/student', mainCtrl.showAdminStudent)
app.get('/admin/student/import', mainCtrl.showAdminStudentImport)
app.post('/admin/student/import', mainCtrl.doAdminStudentImport)
app.get('/admin/student/export', mainCtrl.showAdminStudentExport)
app.get('/admin/course', mainCtrl.showAdminCourse)
app.get('/admin/report', mainCtrl.showAdminReport)
app.get('/student', mainCtrl.getAllStudent)

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
