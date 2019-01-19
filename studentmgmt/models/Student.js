const mongoose = require('mongoose')

const stuSchema = new mongoose.Schema({
  sid: Number,
  name: String,
  age: Number,
  sex: String
})

stuSchema.statics.addStudent = (json, cb) => {
  Student.checkSid(json.sid, tf => {
    if (tf) {
      (new Student(json)).save((err) => {
        if (err) return cb(-2) // 服务器错误
        cb(1) // 添加成功
      })
    } else {
      cb(-1)
    }
  })
}

stuSchema.statics.checkSid = (sid, cb) => {
  Student.find({ 'sid': sid }, (err, rs) => {
    if (err) return console.log('err')
    cb(rs.length === 0)
  })
}
const Student = mongoose.model('Student', stuSchema)

module.exports = Student
