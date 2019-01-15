# Mongoose

## 数据库的连接与测试

```js
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true})

const catSchema = mongoose.Schema({
  name: String,
  type: String
})

const Cat = mongoose.model('Cat', catSchema)

;(new Cat({name: 'kitty2', type: 'hello'})).save().then(() => console.log('meow'))
```

## 静态方法、动态方法

> 静态方法是操作集合的，动态方法是操作文档的

```js
// 静态方法 要在实例化之前
catSchema.statics.findAllCats = function (callback) {
  // this表示整个集合
  this.find({}, (err, cats) => {
    if (err) return console.error(err)
    callback(cats)
  })
}

const Cat = mongoose.model('Cat', catSchema)
module.exports = Cat
```

```js
// 动态方法 要在实例化之前
catSchema.methods.bark = function () {
  console.log(this.name, this.type)
}
```

## 改变数据

> 改变数据，可以直接使用类名调用find方法，而不需要自己封装finaByName方法

```js
// 改名
Cat.find({ name: 'kitty2' }, (err, cats) => {
  if (err) return console.err(err)
  let cat = cats[0]
  cat.name = 'luoxiaohei'
  cat.save()
})
```

## 删除数据

```js
// 删除
Cat.find({ name: 'kitty2' }, (err, cats) => {
  if (err) return console.err(err)
  cats.forEach(item => {
    item.remove() // remove
  })
})
```