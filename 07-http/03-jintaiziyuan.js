const http = require('http');

const fs = require('fs');
const path = require('path');
const mime = require('mime');

// 直接写匿名函数, 默认绑定在onrequest事件上
http.createServer((req, res) => {
  // 1. 获取URL
  let url = req.url;

  let staticPath = path.join(__dirname, url);

  fs.readFile(staticPath, (err, data) => {
    if (err) {
      res.end('404 Not Found');
    }
    // 根据后缀名输出content-type
    let contentType = mime.lookup(staticPath);
    res.writeHead(200, {
      'Content-Type': contentType
    });
    res.end(data);
  });

}).listen(3000, '127.0.0.1', () => {
  console.log('服务启动成功! ');
});