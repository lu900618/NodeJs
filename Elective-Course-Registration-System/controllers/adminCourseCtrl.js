const formidable = require('formidable')
const fs = require('fs')
const Course = require('../models/Course')
const mongoose = require('mongoose')
const url = require('url')

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

exports.getAllCourse = (req, res) => {
  let rows = parseInt(url.parse(req.url, true).query.rows) || 5
  let page = parseInt(url.parse(req.url, true).query.page) || 1
  let sord = url.parse(req.url, true).query.sord === 'asc' ? 1 : -1
  let sidx = url.parse(req.url, true).query.sidx
  let keyword = url.parse(req.url, true).query.keyword

  let obj = {}
  obj[sidx] = sord // 不拼装对象 sort({sidx:sord})会识别成sort({sidx:1})

  let filter = {}
  if (keyword !== undefined || keyword !== '') {
    let reg = new RegExp(keyword, 'g')
    filter = {
      // 模糊查询（全字段查询）
      $or: [
        { name: reg },
        { cid: reg },
        { teacher: reg },
        { briefintro: reg }
      ]
    }
  }

  Course.countDocuments(filter, (err, count) => {
    if (err) return res.json({ result: '服务器错误' })

    // 注意sort先后对结果的影像
    Course.find(filter).sort(obj).skip(rows * (page - 1)).limit(rows).sort(obj).exec((err, results) => {
      if (err) return res.json({ result: '服务器错误' })
      res.json({ rows: results, total: Math.ceil(count / rows), records: count })
    })
  })
}

exports.updateCourse = (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) { return res.json({ result: '服务器错误' }) }
    let cid = fields.cid
    let obj = {}
    obj.cid = fields.cid
    obj.name = fields.name
    obj.dayofweek = fields.dayofweek
    obj.allow = fields.allow.split(',')
    obj.number = fields.number
    obj.teacher = fields.teacher
    obj.briefintro = fields.briefintro
    // obj.oper = fields.oper

    Course.findOneAndUpdate({ cid }, obj, (err, results) => {
      if (err) { return res.json({ result: '数据库异常' }) }
      if (results.length === 0) { return res.json({ result: '未查到该学生信息' }) }
      res.json({ result: '更新成功' })
    })
  })
}

exports.doDeleteCourse = (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) { return res.json({ result: '服务器错误' }) }
    Course.deleteMany({ cid: fields.arr }, (err, count) => {
      if (err) { return res.json({ result: '数据库异常' }) }
      res.json({ result: `删除${count.n}条成功` })
    })
  })
}

exports.doAddCourse = (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) { return res.json({ result: '服务器错误' }) }
    // console.log(fields)

    Course.find({ cid: fields.cid }, (err, results) => {
      if (err) { return res.json({ result: '数据库异常' }) }
      if (results.length > 0) { return res.json({ result: '该课程号已存在' }) }
      let course = new Course()
      course = Object.assign(course, fields)
      course.save(err => {
        if (err) { return res.json({ result: '数据库异常' }) }
        res.json({ result: '新增成功' })
      })
    })
  })
}