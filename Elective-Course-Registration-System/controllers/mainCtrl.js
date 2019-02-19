const crypto = require('crypto')
const formidable = require('formidable')
const Student = require('../models/Student')

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