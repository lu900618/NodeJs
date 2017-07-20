// 文件的复制


const fs = require('fs');
const path = require('path');

console.time('read');
fs.readFile('D:\\迅雷下载\\IDE\\ideaIU-2017.1.4.exe', (err, data) => {
  if (err) throw err;
  console.timeEnd('read');
  console.time('write');
  fs.writeFile('D:\\迅雷下载\\test.exe', data, (err) => {
    if (err) throw err;
    console.log('拷贝完成');
    console.timeEnd('write');
  });
});

// 问题:

// 大文件拷贝 内存受不了

// 没有进度的概念