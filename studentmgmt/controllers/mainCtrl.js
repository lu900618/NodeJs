const url = require('url')
const Student = require('../models/Student')
const formidable = require('formidable')

/**
 * 呈递首页
 */
exports.showIndex = (req, res) => {
  res.render('index')
}

/**
 * 呈递新增页面
 */
exports.showAdd = (req, res) => {
  res.render('add')
}

/**
 * 新增学生方法
 */
exports.doAddStudent = (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) return res.send('err')
    // var testStu = new Student(fields)
    // testStu.save().then(() => {
    //   console.log('add a Student ------>' + JSON.stringify(fields))
    // })
    Student.addStudent(fields, rs => {
      res.json({result: rs})
    })
  })
}

/**
 * 检查学号是否存在
 */
exports.checkSid = (req, res) => {
  console.log('出发了check请求，sid为' + req.params.sid)
  Student.checkSid(req.params.sid, rs => {
    res.json({result: rs})
  })
}

/**
 * 呈递更改学生信息页面
 */
exports.showUpdateStudent = (req, res) => {
  let sid = req.params.sid
  Student.find({ sid }, (err, results) => {
    if (err) {
      res.json({ result: -2 })
      return
    }
    if (results.length === 0) {
      res.json({ result: '查无此人' })
      return
    }
    res.render('update', results[0])
  })
}

exports.updateStudent = (req, res) => {
  let sid = req.params.sid
  console.log(`出发了post请求，修改sid为${sid}的学生`)

  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) return res.send('err')
    Student.find({ sid }, (err, results) => {
      if (err) return res.send('err')
      if (results.length === 0) return res.json({ results: '查无此人' })
      let stu = results[0]
      stu.name = fields.name
      stu.age = fields.age
      stu.sex = fields.sex
      stu.save(err => {
        err ? res.json({result: -1}) : res.json({result: 1})
      })
    })
  })
}

exports.deleteStudent = (req, res) => {
  let sid = req.params.sid
  console.log(`出发了delete请求，修改sid为${sid}的学生`)
  Student.find({ sid }, (err, results) => {
    if (err) return res.send('err')
    if (results.length === 0) return res.json({ results: '查无此人' })
    let stu = results[0]
    stu.remove(err => {
      err ? res.json({result: -1}) : res.json({result: 1})
    })
  })
}

/**
 * 显示所有学生
 */
exports.showAllStudents = (req, res) => {
  console.log('出发了get请求，查询所有学生')
  Student.count({}, (err, count) => {
    if (err) return res.json({ result: -2 })
    Student.find({}, (err, results) => {
      if (err) return res.json({ result: -2 })
      res.json({results, total: count})
    })
  })
}

/**
 * 分页显示学生信息
 * @param req.pageSize 每页展示的条数，默认每页显示5条
 * @param req.pageNumber 第几页，默认为第一页
 */
exports.showPageStudents = (req, res) => {
  let pageSize = parseInt(url.parse(req.url, true).query.pageSize) || 5
  let pageNumber = parseInt(url.parse(req.url, true).query.page) || 1
  console.log(`出发了get请求，查询第${pageNumber}页学生，每页${pageSize}条`)
  Student.countDocuments({}, (err, count) => {
    if (err) return res.json({ result: -2 })
    Student.find({}, null, {skip: pageSize * (pageNumber - 1), limit: pageSize}, (err, results) => {
      if (err) return res.json({ result: -2 })
      console.log(results)
      res.json({results, total: count})
    })
  })
}
