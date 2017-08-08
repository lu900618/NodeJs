// 根据不同的;路径, 做出响应

// 网站上的路径就是一个标识
// 路径 /login.html 网站不一定有login.html文件

const http = require("http");
const fs = require('fs');
const path = require('path');

const server = http.createServer();

server.on('request', (req, res) => {
  // console.log(req.headers);
  // console.log(req.httpVersion);
  // console.log(req.method);
  // console.log(req.url);

  // 获取请求路径
  let url = req.url;
  // 根据路径做出响应
  // 使用node原生的 http 模块 天生不支持静态文件处理
  switch (url) {
    case '/':
      fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
        if (err) {
          // throw err;
          // throw 会造成服务器崩溃
          // 为了开发阶段更快的看到错误信息, 将错误信息输出到浏览器
          return res.end(err.message);
        };
        res.writeHead(200, {
          'Content-Type': 'text/html;charset=utf-8'
        });
        res.end(data);
      });

      /*       res.writeHead(200, {
              'Content-Type':'text/html;charset=utf-8'
            });
            res.end(`<!DOCTYPE html>
      <html lang="en">
      <head>
      	<meta charset="UTF-8">
      	<title>首页</title>
      </head>
      <body>
      	<h1>Hello</h1>
      </body>
      </html>`); */
      break;
    case '/a':
      res.end('a page');
      break;
    case '/login.html':
      res.end('login page');
      break;

    default:
      res.end('index page');
      break;
  }


});

server.listen(3000, () => {
  console.log('server is running at port 3000');
});