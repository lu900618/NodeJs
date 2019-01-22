const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  'sid': String,
  'name': String,
  'grade': String,
  'password': String,
  'isChangedPwd': {type: Boolean, default: false}
})

studentSchema.statics.importStudents = list => {
  const pwdStr = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#'
  const gradeArr = ['初一', '初二', '初三', '高一', '高二', '高三']

  mongoose.connection.collection('students').drop(() => {
    for (let i = 0; i < 6; i++) {
      for (let j = 1; j < list[i].data.length; j++) { // 不从0开始是因为要去掉表头
        let password = ''
        for (let i = 0; i < 6; i++) {
          password += pwdStr.charAt(parseInt(Math.random() * pwdStr.length))
        }
        let stu = new Student({
          sid: list[i].data[j][0],
          name: list[i].data[j][1],
          grade: gradeArr[i],
          password: password
        })
        stu.save()
      }
    }
  })
}

const Student = mongoose.model('Student', studentSchema)

module.exports = Student
