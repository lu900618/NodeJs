const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  // res.end('Hello World')
  let url = req.url
  let method = req.method
  let path = url.split('?')[0]
  let query = querystring.parse(url.split('?')[1])

  res.setHeader('content-type', 'application/json')
  const resData = {
    url,
    method,
    path,
    query
  }

  if (req.method === 'GET') {
    res.end(JSON.stringify(resData))
  } else if (req.method === 'POST') {
    console.log('content-type', req.headers['content-type']);
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      resData.postData = postData
      res.end(JSON.stringify(resData))
    })
  }
})

server.listen(9999, () => {
  console.log('server is running on http://localhost:9999');
})

