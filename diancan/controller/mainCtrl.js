const formidable = require('formidable')
const file = require('../models/file')

/**
 * 显示首页
 */
exports.showIndex = (req, res) => {
  res.render('index')
}

/**
 * 保存订单
 */
exports.saveOrders = (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.send('somthing happened')
      return
    }
    let mobile = fields.mobile
    let name = fields.name
    file.save(mobile, name, (err, data) => {
      if (err) {
        res.send('somthing happened')
      } else {
        res.send('1')
      }
    })
  })
}

/**
 * 显示所有订单
 */
exports.queryOrders = (req, res) => {
  file.queryList((err, data) => {
    if (err) {
      res.send('somthing happened')
    } else {
      res.render('allOrders', {
        list: data
      })
    }
  })
}

exports.queryOrder = (req, res) => {
  let mobile = req.params.mobile
  file.read(mobile, (err, data) => {
    if (err) {
      res.send('somthing happened')
    } else {
      res.render('oneOrder', {
        mobile: mobile,
        name: data
      })
    }
  })
}
