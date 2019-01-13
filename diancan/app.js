const express = require('express')
const mainCtrl = require('./controller/mainCtrl')

const app = express()

app.set('view engine', 'ejs')

app.get('/', mainCtrl.showIndex)
app.post('/baocun', mainCtrl.saveOrders)
app.get('/dingdan', mainCtrl.queryOrders)
app.get('/dingdan/:mobile', mainCtrl.queryOrder)

app.use(express.static('public'))
app.listen(3000)
