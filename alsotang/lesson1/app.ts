import * as express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!\n')
})

app.listen(3000, () => {
  console.log('This is my first node app!\n')
})

// npm install --save-dev @types/express
