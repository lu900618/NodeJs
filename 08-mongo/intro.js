const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true})

const catSchema = mongoose.Schema({
  name: String,
  type: String
})

// 静态方法 要在实例化之前
catSchema.statics.findAllCats = function (callback) {
  this.find({}, (err, cats) => {
    if (err) return console.error(err)
    callback(cats)
  })
}
// 动态方法 要在实例化之前
catSchema.methods.bark = function () {
  console.log(this.name, this.type)
}

const Cat = mongoose.model('Cat', catSchema)
module.exports = Cat

// ; (new Cat({ name: 'kitty2', type: 'hello' })).save().then(() => console.log('meow'))

// Cat.findAllCats(dogs => { console.log(dogs) })
// const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})

// const Cat = mongoose.model('Cat', { name: String })

// const kitty = new Cat({ name: 'Zildjian' })
// kitty.save().then(() => console.log('meow'))

// let kt = new Cat({ name: 'kitty2', type: 'hello' })
// kt.save()
// kt.bark()

// 改名
// Cat.find({ name: 'kitty2' }, (err, dogs) => {
//   if (err) return console.err(err)
//   let dog = dogs[0]
//   dog.name = 'luoxiaohei'
//   dog.save()
// })

// 删除
Cat.find({ name: 'kitty2' }, (err, dogs) => {
  if (err) return console.err(err)
  dogs.forEach(item => {
    item.remove()
  })
})
