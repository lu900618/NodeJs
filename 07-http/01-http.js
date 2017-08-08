const http = require('http');
const moment = require('moment');

let server = http.createServer();

// server 收到客户端的请求
server.on('request', (request, response) => {
  console.log('有客户端请求进来了');
  response.writeHead(200, {
    'Content-type':'text/plain; charset=utf-8'
  });
  response.write('当前服务器最新时间是: ' + moment().format('YYYY-MM-DD hh:mm:ss'));
  response.end();
});

server.listen(3000, '127.0.0.1', (err) => {
  if (err) {
    throw err;
  }
  console.log('服务器开启成功');
});