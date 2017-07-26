// 建立一个socket客户端

const net = require('net');

// 创建一个socket服务器
var server = net.createServer((socket) => {
  /* // console.log('connection....');
  var client = socket.address();
  console.log(client.address + ' connection....'); */

  console.log(`${socket.remoteAddress}:${socket.remotePort} 接入`);
  socket.write(`Hello ${socket.remoteAddress}:${socket.remotePort} 你来了`);


  // 监听socket是否有数据过来
  socket.on('data', (chunk) => {
    console.log(chunk.toString());// chunk 是buffer 所以要toString
    socket.write("server > 你说哈?");
  });
});



var port = 2080;
server.listen(port, (err) => {
  // err 坚挺失败 -- 端口被占用
  if (err) {
    console.log('端口被占用');
    return;
  }
  console.log(`端口${port}监听中...`);
});