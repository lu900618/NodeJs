// 建立一个socket客户端

const net = require('net');

// 储存用户的连接
let clients = [];

// 创建一个socket服务器
let server = net.createServer((socket) => {

  clients.push(socket);

  console.log(`Welcome ${socket.remoteAddress} to 2080 chatroom!!`);
  // 监听socket是否有数据过来
  // 有任何客户端的消息都会触发
  socket.on('data', (chunk) => {
    // 数据格式 约定协议
    // chunk:broadcast|张三|内容
    // chunk：{"procotol":"boardcast","from":"张三","message":"弄啥咧！"}
    // chunk：{"procotol":"p2p","from":"张三","to":"李四","message":"弄啥咧！"}
    try {
      let signal = JSON.parse(chunk.toString().trim());
      let procotol = signal.procotol;
      switch (procotol) {
        case 'broadcast':
          broadcast(signal);
          break;

        default:
          socket.write('其他协议, 升级后支持');
          break;
      }
    } catch (error) {
      socket.write(error);
    }
  });

  function broadcast(signal) {
    console.log(signal);
    let userName = signal.from;
    let message = signal.message;

    let send = {
      procotol: signal.procotol,
      from: userName,
      message: message
    };

    clients.forEach((client) => {
      client.write(JSON.stringify(send));
    })
  }
});



var port = 2080;
server.listen(port, (err) => {
  // err 坚挺失败 -- 端口被占用
  if (err) {
    console.log('端口被占用');
    return false;
  }
  console.log(`端口${port}监听中...`);
});