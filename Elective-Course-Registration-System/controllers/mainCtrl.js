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

      } else {
        if (fields.password === stu.password) {
          req.session.login = true
          req.session.sid = stu.sid
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
  res.render('index', {})
}