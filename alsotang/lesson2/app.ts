import * as express from 'express'
import * as utility from 'utility'

const app = express()

// http://localhost:3000/?q=1
app.get('/', (req, res) => {
  let q = req.query.q // req.query接收query方式传来的参数
  let md5Value = utility.md5(q)
  res.send(md5Value)
})

app.listen(3000, () => {
  console.log('server in running at http://loaclhost:3000')
})
