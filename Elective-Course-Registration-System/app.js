
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const courseCtrl = require('./controllers/adminCourseCtrl')
const mainCtrl = require('./controllers/adminCtrl')
const studentCtrl = require('./controllers/adminStudentCtrl')

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

app.get('/admin/student', studentCtrl.showAdminStudent)
app.get('/admin/student/import', studentCtrl.showAdminStudentImport)
app.post('/admin/student/import', studentCtrl.doAdminStudentImport)
app.get('/admin/student/export', studentCtrl.showAdminStudentExport)
app.get('/admin/student/add', studentCtrl.showAdminStudentAdd)
app.get('/admin/student/download', studentCtrl.downloadStudentXlsx)
app.get('/student', studentCtrl.getAllStudent)
app.post('/student', studentCtrl.doAddStudent)
app.delete('/student', studentCtrl.doDeleteStudent)
app.post('/student/:sid', studentCtrl.updateStudent)
app.propfind('/student/:sid', studentCtrl.checkSid)

app.get('/admin/course', courseCtrl.showAdminCourse)
app.get('/admin/course/import', courseCtrl.showAdminCourseImport)
app.post('/admin/course/import', courseCtrl.doAdminCourseImport)
app.get('/admin/course/add', courseCtrl.showAdminCourseAdd)
app.get('/course', courseCtrl.getAllCourse)
app.delete('/course', courseCtrl.doDeleteCourse)
app.post('/admin/course/', courseCtrl.updateCourse)

app.get('/admin/report', mainCtrl.showAdminReport)
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
