var fs = require("fs");
fs.readFile('./01.js', 'utf8', (err, data) => {
  console.log(data);
});

fs.access('./011.js', (err) => {
  if (err) {
    console.log("报错了");
  }
});

// 异步执行的先后顺序是不确定的