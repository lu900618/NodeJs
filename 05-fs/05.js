// 文件写入

const fs = require('fs');
const path = require('path');

// 1.fs.writeFile()

// JSON.stringify 序列化
// JSON.parse 反序列化
/* // 默认覆盖文件, 追加fs.appendFile
  fs.writeFile(path.join(__dirname, 'tmp.txt'), JSON.stringify({ id: 10 }), (err) => {
  if (err) console.log(err);
  else console.log("success");
}) */
// 2.fs.writeFileSync();
// 同步用try catch捕获异常
// 3.fs.createWriteStream();
var streamWriter = fs.createWriteStream(path.join(__dirname, 'temp.txt'));
setInterval(() => {
  streamWriter.write('hello', () => {
    console.log('+1');
  });
}, 1000);
