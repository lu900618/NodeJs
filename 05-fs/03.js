// 动态显示歌词
const fs = require("fs");
const path = require("path");
const iconv = require("iconv-lite");// 解决gbk等编码问题

fs.readFile(path.join(__dirname, './lyrics/血染的风采.lrc'), (error, data) => {
  // console.log(iconv.decode(data,'gbk'));
  var lines = iconv.decode(data, 'gbk').split('\n');
  // console.log(lines.length);
  var regex = /\[(\d{2})\:(\d{2})\.(\d{2})\]\s(.+)/;//.任意非换行字符
  lines.forEach((line) => {
    // exec 按()分组
    // 返回值:[[字符串本身-$0],[第一组$1],...]
    var matches = regex.exec(line);
    var begin = new Date().getTime();
    if (matches) {
      var m = parseInt(matches[1]); // 分钟
      var s = parseInt(matches[2]); // 秒
      var f = parseInt(matches[3]); // 毫秒;
      var lyric = matches[4]; // 歌词, 不是立即显示

      var offset = new Date().getTime() - begin;

      setTimeout(() => {
        console.log(lyric);
      }, m * 60 * 1000 + s * 1000 + f - offset);

    } else {
      // 不是一行歌词
      console.log(line);
    }
  });
});