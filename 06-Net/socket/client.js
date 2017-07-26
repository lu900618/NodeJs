// 建立一个socket客户端

const net = require('net');

/* var client = net.connect({ port: 2080 }, () => {

  //'connect' listener
  console.log('connected to server!');
  client.write('world!\r\n');
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
}); */

var client = net.connect({ port: 2080 }, () => {

  //'connect' listener
  console.log('连接服务器成功.');

  process.stdin.on('data', (chunk) => {
    // console.log(chunk.toString());
    client.write(chunk.toString());
    process.stdout.write('\nclient >');
  });

  // 监听socket是否有数据过来
  client.on('data', (data) => {
    console.log('\n' + data.toString());
  });
});

