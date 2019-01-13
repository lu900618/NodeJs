const express = require('express')

const app = express()
const mainCtrl = require('./controllers/mainCtrl')

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', mainCtrl.showIndex)
app.get('/:number', mainCtrl.showResult)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
