var fs = require("fs");
// 不指定编码, 返回的是buffer(缓冲区)
// readFile使用了Buffer, 但是也是一次性读取
fs.readFile('./01.js', 'utf8', (err, data) => {
  console.log(data);
});


fs.access('./011.js', (err) => {
  if (err) {
    console.log("报错了");
  }
});

// 异步执行的先后顺序是不确定的