// 动态显示歌词
const fs = require("fs");
const path = require("path");
const iconv = require("iconv-lite");
const readline = require("readline");

let fileName = path.join(__dirname, './lyrics/血染的风采.lrc');
let regex = /\[(\d{2})\:(\d{2})\.(\d{2})\]\s(.+)/;//.任意非换行字符

/* 
// 以流的方式读取文件
let streamReader = fs.createReadStream(fileName);

let data = '';
streamReader.on('data', (chunk) => {
  // chunk 只是文档片段, 不完整
  data += chunk.toString();
});
streamReader.on('end', () => {
  // 通知你已经读取结束了, data是完整的了
  console.log(data);
});
 */
let streamReader = fs.createReadStream(fileName)
  .pipe(iconv.decodeStream('gbk'));

// readline方式
let rl = readline.createInterface({ input: streamReader });
// 每次读取一行
let begin = new Date().getTime();
rl.on('line', (line) => {
  task(line, begin);
});


function task(line, begin) {
  // exec 按()分组
  // 返回值:[[字符串本身-$0],[第一组$1],...]
  let matches = regex.exec(line);

  if (matches) {
    let m = parseInt(matches[1]); // 分钟
    let s = parseInt(matches[2]); // 秒
    let f = parseInt(matches[3]); // 毫秒;
    let lyric = matches[4]; // 歌词, 不是立即显示

    let offset = new Date().getTime() - begin;

    setTimeout(() => {
      console.log(lyric);
    }, m * 60 * 1000 + s * 1000 + f - offset);

  } else {
    // 不是一行歌词
    console.log(line);
  }
}