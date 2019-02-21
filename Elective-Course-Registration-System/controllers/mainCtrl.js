const crypto = require('crypto')
const formidable = require('formidable')
const Student = require('../models/Student')
const Course = require('../models/Course')
const _ = require('underscore')

exports.showLogin = (req, res) => {
  res.render('login', {})
}

exports.doLogin = (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) { return res.json({ result: '服务器错误' }) }
    Student.find({ sid: fields.sid }, (err, results) => {
      if (err) { return res.json({ result: '服务器错误' }) }
      if (results.length === 0) { return res.json({ result: '未找到该学生信息' }) }
      if (results.length > 1) { return res.json({ result: '数据库异常：学号信息重复' }) }
      let stu = results[0]
      if (stu.isChangedPwd) { // 非初始密码
        if (crypto.createHash('MD5').update(fields.password).digest('hex') === stu.password) {
          req.session.login = true
          req.session.sid = stu.sid
          req.session.name = stu.name
          req.session.grade = stu.grade
          req.session.isChangedPwd = true
          return res.json({ result: '登录成功', code: 0000 })
        } else {
          return res.json({ result: '用户名或密码不正确' })
        }
      } else {
        if (fields.password === stu.password) {
          req.session.login = true
          req.session.sid = stu.sid
          req.session.name = stu.name
          req.session.grade = stu.grade
          req.session.isChangedPwd = false
          return res.json({ result: '登录成功', code: 0000 })
        } else {
          return res.json({ result: '用户名或密码不正确' })
        }
      }
    })
  })
}

exports.showTable = (req, res) => {
  if (req.session.login != true) {
    return res.redirect('/login')
  }
  if (req.session.isChangedPwd === false) {
    return res.redirect('/changepw')
  }
  res.render('index', {
    sid: req.session.sid,
    name: req.session.name,
    grade: req.session.grade
  })
}

exports.doLogout = (req, res) => {
  req.session = null
  return res.redirect('/login')
}

exports.showChangepw = (req, res) => {
  if (req.session.login != true) {
    return res.redirect('/login')
  }
  res.render('changepw', {
    sid: req.session.sid,
    name: req.session.name,
    grade: req.session.grade,
    showtip: !req.session.isChangedPwd
  })
}

exports.doChangepw = (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) { return res.json({ result: '服务器错误' }) }
    let pw = crypto.createHash('MD5').update(fields.pw).digest('hex')
    Student.findOneAndUpdate({ sid: req.session.sid }, { password: pw, isChangedPwd: true }, (err, results) => {
      if (err) { return res.json({ result: '服务器错误' }) }
      res.json({ result: '密码修改成功', code: 0000 })
    })
  })
}

exports.check = (req, res) => {
  let results = {}
  Student.find({ sid: req.session.sid }, (err, students) => {
    if (err) { return res.json({ result: '服务器错误' }) }
    // 已经报名的课程序号
    let myCourses = students[0].myCourses
    let grade = students[0].grade
    // 映射对象：存的是已报名课程和星期的对应关系
    let occupyWeek = [] // 已经占用的星期

    Course.find({}, (err, courses) => {
      if (err) { return res.json({ result: '服务器错误' }) }
      courses.forEach(c => {
        if (myCourses.indexOf(c.cid) !== -1) {
          occupyWeek.push(c.dayofweek)
        }
      })
      courses.forEach(c => {
        if (c.number <= 0) {
          results[c.cid] = '没有剩余名额了'
        } else if (myCourses.indexOf(c.cid) !== -1) {
          results[c.cid] = '已经报名此课程'
        } else if (occupyWeek.indexOf(c.dayofweek) !== -1) {
          results[c.cid] = '当天已经报名其他课程'
        } else if (c.allow.indexOf(grade) == -1) {
          results[c.cid] = '不允许该年级学生报名本课程'
        } else if (occupyWeek.length == 2) {
          results[c.cid] = '已达报名课程数量上限'
        } else {
          results[c.cid] = '可以报名'
        }
      })
      res.json(results)
    })
  })
}

exports.baoming = (req, res) => {
  let sid = req.session.sid
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    let cid = fields.cid
    Student.find({ sid }, (err, students) => {
      if (err) { return res.json({ result: '服务器错误' }) }
      students[0].myCourses.push(cid)
      students[0].save(err => {
        if (err) { return res.json({ result: '服务器错误' }) }
        Course.find({ cid }, (err, courses) => {
          if (err) { return res.json({ result: '服务器错误' }) }
          courses[0].myCourses.push(cid)
          courses[0].number--
          courses[0].save(err => {
            if (err) { return res.json({ result: '服务器错误' }) }
            res.json({ result: '报名成功' })
          })
        })
      })
    })
  })
}

exports.tuibao = (req, res) => {
  let sid = req.session.sid
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    let cid = fields.cid
    Student.find({ sid }, (err, students) => {
      if (err) { return res.json({ result: '服务器错误' }) }
      students[0].myCourses = _.without(students[0].myCourses, cid)
      students[0].save(err => {
        if (err) { return res.json({ result: '服务器错误' }) }
        Course.find({ cid }, (err, courses) => {
          if (err) { return res.json({ result: '服务器错误' }) }
          courses[0].myCourses = _.without(courses[0].myCourses, cid)
          courses[0].number++
          courses[0].save(err => {
            if (err) { return res.json({ result: '服务器错误' }) }
            res.json({ result: '退报成功' })
          })
        })
      })
    })
  })
}