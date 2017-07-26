// 建立一个socket客户端

const net = require('net');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.question('What\'s your name? ', (name) => {
  name = name.trim();
  if (!name) {
    throw new Error('来个名头');
  }

  let server = net.connect({ port: 2080, host: '192.168.43.138' }, () => {
    console.log(`Welcome ${name} to 2080 chatroom`);
    server.on('data', (chunk) => {

      try {
        let signal = JSON.parse(chunk.toString().trim());

        let procotol = signal.procotol;
        switch (procotol) {
          case 'broadcast':
            console.log('\nbroadcast');
            console.log(signal.from + '>');
            console.log(signal.message);
            rl.prompt();
            break;

          default:
            server.write('其他协议, 升级后支持');
            break;
        }
      } catch (error) {
        server.write(error);
      }
    });

    rl.setPrompt('name' + '> ');
    rl.prompt();

    rl.on('line', (line) => {
      var send = {
        procotol: 'broadcast',
        from: name,
        message: line.toString().trim()
      };

      server.write(JSON.stringify(send));

      rl.prompt();
    }).on('close', () => {

    });
  });
});

