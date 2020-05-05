var fs = require('fs');
// 不指定编码, 返回的是buffer(缓冲区)
// readFile使用了Buffer, 但是也是一次性读取
fs.readFile('./01.js', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// 检查当前目录中是否存在该文件, 不传默认值: fs.constants.F_OK
fs.access('./09.js', (err) => {
  if (err) {
    console.log('报错了');
  }
  console.log('file exist');
});

// 异步执行的先后顺序是不确定的
