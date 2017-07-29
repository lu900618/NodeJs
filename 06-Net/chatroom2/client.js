const net = require('net');
const config = require('./config');

let username;
let client = net.createConnection(config.port, config.host, () => {

  console.log('连接服务器成功');
  console.log('请输入您的昵称: ');

  process.stdin.on('data', (data) => {
    // 这里需要判定用户状态
    // 没有注册提示注册
    // 注册成功, 就发送广播或者点对点消息
    if (!username) {
      data = data.toString().trim();
      let sendData = {
        protocal: 'signup',
        message: data
      };
      client.write(JSON.stringify(sendData));
    } else {
      // todo 用户输入广播消息或者p2p消息
      
    }
  });


});

client.on('data', (data) => {
  data = JSON.parse(data.toString());
  switch (data.protocal) {
    case 'signup':
      switch (data.code) {
        case 1000: // 恭喜, 注册成功! 
          username = true;
          console.log(data.message);
          break;
        case 1001: // 用户名已存在
          console.log(data.message);
          break;
      }
      break;

    case 'broadcast':

      break;

    case 'p2p':
      break;
    default:
      break;
  }


}); 