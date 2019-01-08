import * as http from 'http'

// const server = http.createServer((req, res) => {
//   res.end('123')
// })

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  res.end('Hello World!\n')
})

server.listen(8000)