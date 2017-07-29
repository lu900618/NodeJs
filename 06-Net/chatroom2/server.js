const net = require('net');
const config = require('./config');

let onlineUsers = 0;// 在线人数
let userNames = []; // 保存所有用户的socket

net.createServer((socket) => {
  // users.push(socket);
  // console.log('有客户端连接上来了!');
  // onlineUsers += 1;
  // console.log(`当前在线人数: ${onlineUsers}`);
  // socket.write('hello');
  socket
    .on('data', (data) => {

      data = data.toString();
      data = JSON.parse(data);// 反序列化
console.log(data);
      switch (data.protocal) {
        case 'signup':
          console.log('收到注册请求');
          let name;
          let sendData = {};
          userNames.forEach(userName => {
            if (userName === data.message) {
              // 遍历给name赋值
              name = userName;
            }
          });
          // name非空, 说明数组中存在name
          if (name) {
            sendData = {
              protocal: 'signup',
              code: 1001,
              message: '用户名已存在'
            };
            return socket.write(JSON.stringify(sendData));
            // return socket.write("用户名已存在");
          }

          userNames.push(data.message);
          // socket.write("恭喜, 注册成功! ");
          sendData = {
            protocal: 'signup',
            code: 1000,
            message: '恭喜, 注册成功! '
          };
          socket.write(JSON.stringify(sendData));
          break;
        case 'broadcast':

          break;
        case 'p2p':

          break;
        default:
          break;
      }

      /*  // 将data数据发送给所有人 -- 广播
       users.forEach((user) => {
         user.write(data);
       }); */




      // data = data.toString();
      // console.log(data);
    })
    .on('error', (err) => {
      console.log('有客户端异常退出');
      onlineUsers -= 1;
    });
}).listen(config.port, config.host, (err) => {
  if (err) {
    throw err;
  }
  console.log(`server is running at ${config.host}: ${config.port}`);
});