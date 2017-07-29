const net = require('net');

const client = net.createConnection(3000, '127.0.0.1')

client.on('connect', () => {
  console.log("客户端和服务器连接成功");
});

client.on('data', (data) => {
  console.log(`服务器端说${data.toString()}`);
  let d = data.toString();
  if (d === 'hello') {
    client.write('world');
  }
});