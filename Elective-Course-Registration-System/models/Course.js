const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  cid: String,
  name: String,
  dayofweek: String,
  number: Number,
  allow: [String],
  teacher: String,
  briefintro: String,
  'myCourses': [String]
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course
