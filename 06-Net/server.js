const net = require('net');

const server = net.createServer();

server.on('connection', (socket) => {
  // 获取远程客户端的ip地址
  let addr = socket.remoteAddress;
  // 获取远程客户端的端口号
  let port = socket.remotePort;
  console.log(`客户端${addr}:${port}连接上来了`);

  socket.write('hello')

  socket.on('data', (data) => {
    console.log(`客户端${addr}:${port}说${data.toString()}`);
  });
});

let port = 3000;
server.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
