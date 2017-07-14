// 引入模块
var fs = require('fs');

// 读文件
fs.readFile("./读文件.js", "utf8", function (err, data) {
  console.log(data);
});