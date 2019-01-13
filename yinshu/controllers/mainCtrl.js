const file = require('../models/file')
const math = require('../models/math')

exports.showIndex = (req, res) => {
  res.render('index')
}

exports.showResult = (req, res) => {
  let startTime = new Date()
  let number = req.params.number
  if (number > 100000) return
  file.read(number, (err, data) => {
    if (err) {
      let result = math.calc(number)
      file.write(number, result, err => {
        if (err) res.send('文件写入失败')
        else {
          let endTime = new Date()
          res.render('result', {
            result: result,
            during: endTime - startTime,
            number: number
          })
        }
      })
      return
    }
    let endTime = new Date()
    res.render('result', {
      result: data,
      during: endTime - startTime,
      number: number
    })
  })
}
