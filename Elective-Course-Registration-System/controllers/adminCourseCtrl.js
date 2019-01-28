const formidable = require('formidable')
const fs = require('fs')
const Course = require('../models/Course')
const mongoose = require('mongoose')

exports.showAdminCourse = (req, res) => {
  res.render('admin/course', {
    page: 'course'
  })
}

exports.showAdminCourseImport = (req, res) => {
  res.render('admin/course/import', {
    page: 'course'
  })
}

exports.showAdminCourseAdd = (req, res) => {
  res.render('admin/course/add', {
    page: 'course'
  })
}

exports.doAdminCourseImport = (req, res) => {
  const form = new formidable.IncomingForm()
  // 设置上传路径
  form.uploadDir = './uploads'
  // 保留后缀名
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if (err) { return res.json({ result: '服务器错误' }) }
    fs.readFile(files.coursejson.path, (err, data) => {
      if (err) { return res.json({ result: '文件读取失败' }) }
      // 删除旧数据
      mongoose.connection.collection('courses').drop(err => {
        if (err) { return res.json({ result: '数据库连接失败' }) }
        let c = JSON.parse(data.toString())
        // 直接插入数组
        Course.insertMany(c.courses, (err, r) => {
          if (err) { return res.json({ result: '文件上传失败' }) }
          res.json({ result: r.length })
        })
      })
    })
  })
}