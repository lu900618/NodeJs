const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const xlsx = require('node-xlsx')
const url = require('url')
const Student = require('../models/Student')

exports.showAdminDashboard = (req, res) => {
  res.render('admin/index', {
    page: 'index'
  })
}

exports.showAdminStudent = (req, res) => {
  res.render('admin/student', {
    page: 'student'
  })
}

exports.showAdminStudentImport = (req, res) => {
  res.render('admin/student/import', {
    page: 'student'
  })
}

exports.doAdminStudentImport = (req, res) => {
  const form = new formidable.IncomingForm()
  form.uploadDir = './uploads'
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) { return res.json({ result: '服务器错误' }) }
    console.log(`收到文件上传请求，文件是：${files.studentexcel.name}，后缀名是${path.extname(files.studentexcel.name)}`)
    // 判断文件后缀名
    if (path.extname(files.studentexcel.name) !== '.xlsx') {
      // 删除这个不正确的文件
      return fs.unlink('./' + files.studentexcel.path, err => {
        if (err) { return res.json({ result: '服务器错误' }) }
        res.json({ result: '文件类型不正确, 已被删除！' })
      })
    }

    // 读取数据
    let worksheetsFormData = xlsx.parse('./' + files.studentexcel.path)
    // 检查sheet个数
    if (worksheetsFormData.length !== 6) {
      return fs.unlink('./' + files.studentexcel.path, err => {
        if (err) { return res.json({ result: '服务器错误' }) }
        res.json({ result: '系统检测到您上传的Excel文件缺少子表格, 已被删除！' })
      })
    }
    // 检查每个sheet的表头
    for (let i = 0; i < 6; i++) {
      if (worksheetsFormData[i].data[0][0] !== '学号' || worksheetsFormData[i].data[0][1] !== '姓名') {
        return fs.unlink('./' + files.studentexcel.path, err => {
          if (err) { return res.json({ result: '服务器错误' }) }
          res.json({ result: '系统检测到您上传的Excel文件表头不正确, 已被删除！' })
        })
      }
    }

    // 导入数据
    Student.importStudents(worksheetsFormData)

    res.json({ result: '上传成功！' })
  })
}

exports.showAdminStudentExport = (req, res) => {
  res.render('admin/student/export', {
    page: 'student'
  })
}

exports.showAdminCourse = (req, res) => {
  res.render('admin/course', {
    page: 'course'
  })
}

exports.showAdminReport = (req, res) => {
  res.render('admin/report', {
    page: 'report'
  })
}

exports.getAllStudent = (req, res) => {
  let rows = parseInt(url.parse(req.url, true).query.rows) || 5
  let page = parseInt(url.parse(req.url, true).query.page) || 1
  let sord = url.parse(req.url, true).query.sord === 'asc' ? 1 : -1
  let sidx = url.parse(req.url, true).query.sidx
  Student.countDocuments({}, (err, count) => {
    if (err) return res.json({ result: '服务器错误' })
    // Student.find({}, null, { skip: rows * (page - 1), limit: rows}, (err, results) => {
    //   if (err) return res.json({ result: '服务器错误' })
    //   res.json({ rows: results, total: Math.ceil(count / rows), records: count })
    // })
    let obj = {}
    obj[sidx] = sord

    Student.find({}).skip(rows * (page - 1)).limit(rows).sort(obj).exec((err, results) => {
      if (err) return res.json({ result: '服务器错误' })
      res.json({ rows: results, total: Math.ceil(count / rows), records: count })
    })
  })
}
