const express = require('express')
const mainCtrl = require('./controllers/mainCtrl')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost/stumgmt', { useNewUrlParser: true })

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', mainCtrl.showIndex)
app.get('/add', mainCtrl.showAdd)

// app.get('/student', mainCtrl.showPageStudents)
app.get('/student', mainCtrl.showAllStudents)
app.post('/student', mainCtrl.doAddStudent)

app.propfind('/student/:sid', mainCtrl.checkSid)
app.get('/student/:sid', mainCtrl.showUpdateStudent)
app.post('/student/:sid', mainCtrl.updateStudent)
app.delete('/student/:sid', mainCtrl.deleteStudent)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
