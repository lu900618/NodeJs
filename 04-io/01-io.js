var http = require('http');

var count = 0;

http.createServer(function (req, res) {
  count++;
  res.writeHead(200, { "content-type": "text/html;charset=utf8" });
  res.end("我是服务器, 我接收了" + count + "个请求. ");
}).listen(3000);