const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const xlsx = require('node-xlsx')
const url = require('url')
const dateformat = require('date-format')
const Student = require('../models/Student')

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

exports.getAllStudent = (req, res) => {
  // if (req.session.login != true) {
  //   return res.redirect('/login')
  // }
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
        { sid: reg },
        { grade: reg }
      ]
    }
  }

  Student.countDocuments(filter, (err, count) => {
    if (err) return res.json({ result: '服务器错误' })
    // Student.find({}, null, { skip: rows * (page - 1), limit: rows}, (err, results) => {
    //   if (err) return res.json({ result: '服务器错误' })
    //   res.json({ rows: results, total: Math.ceil(count / rows), records: count })
    // })

    // 注意sort先后对结果的影像
    Student.find(filter).sort(obj).skip(rows * (page - 1)).limit(rows).sort(obj).exec((err, results) => {
      if (err) return res.json({ result: '服务器错误' })
      res.json({ rows: results, total: Math.ceil(count / rows), records: count })
    })
  })
}

exports.updateStudent = (req, res) => {
  let sid = parseInt(req.params.sid)
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) { return res.json({ result: '服务器错误' }) }
    let key = fields.cellname
    let value = fields.value
    let obj = {}
    obj[key] = value
    Student.findOneAndUpdate({ sid }, obj, (err, results) => {
      if (err) { return res.json({ result: '数据库异常' }) }
      if (results.length === 0) { return res.json({ result: '未查到该学生信息' }) }
      res.json({ result: '更新成功' })
    })
  })
}

exports.showAdminStudentAdd = (req, res) => {
  res.render('admin/student/add', {
    page: 'student'
  })
}

exports.doAddStudent = (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) { return res.json({ result: '服务器错误' }) }
    let stu = new Student()
    stu = Object.assign(stu, fields)
    // 验证数据
    if (!/^\d{9}$/g.test(stu.sid)) {
      return res.json({ result: '学号必须是9位' })
    }
    if (!/^(?:[\u4e00-\u9fa5]+)(?:●[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z]*[a-zA-Z]+$/g.test(stu.sid)) {
      return res.json({ result: '请输出中文名称' })
    }

    // stu.password = md5(fields.password)
    Student.find({ sid: stu.sid }, (err, results) => {
      if (err) { return res.json({ result: '数据库异常' }) }
      if (results.length > 0) { return res.json({ result: '该学号已存在' }) }
      stu.save(err => {
        if (err) { return res.json({ result: '数据库异常' }) }
        res.json({ result: '新增成功' })
      })
    })
  })
}

exports.checkSid = (req, res) => {
  let sid = parseInt(req.params.sid)
  Student.countDocuments({ sid }, (err, count) => {
    if (err) { return res.json({ result: '数据库异常' }) }
    if (count > 0) { return res.json({ result: '学号已存在' }) }
    return res.json({ result: 1 })
  })
}

exports.doDeleteStudent = (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) { return res.json({ result: '服务器错误' }) }
    Student.remove({ sid: fields.arr }, (err, count) => {
      if (err) { return res.json({ result: '数据库异常' }) }
      console.log(count)
      res.json({ result: `删除${count.n}条成功` })
    })
  })
}

exports.downloadStudentXlsx = (req, res) => {
  let xlsxData = []
  const gradeList = ['初一', '初二', '初三', '高一', '高二', '高三']

  function iterator (i) {
    if (i === gradeList.length) {
      console.log(xlsxData)
      let buffer = xlsx.build(xlsxData)
      let filename = dateformat('yyyyMMddhhmmssSSS.xlsx')
      fs.writeFile('./public/xlsx/' + filename, buffer, (err) => {
        if (err) { return res.json({ result: '生成文件失败' }) }
        res.redirect('/xlsx/' + filename)
      })
      return
    }
    let sheet = []
    sheet.push(['学号', '姓名', '年级', '密码'])
    Student.find({ grade: gradeList[i] }, (err, results) => {
      if (err) { return res.json({ result: '服务器错误' }) }
      results.forEach(item => {
        sheet.push([item.sid, item.name, item.grade, item.password])
      })
      xlsxData.push({ name: gradeList[i], data: sheet })
      iterator(++i)
    })
  }

  iterator(0)
}
