// 引入模块
var fs = require('fs');

// 读文件
/* fs.readFile("./读文件.js", "utf8", function (err, data) {
  console.log(data);
}); */

fs.readFile("./读文件1.js", "utf8", (err, data)=> {
  console.log(data);
  // console.log(err);
  if (err) throw err;
  /** 
   * 文件正常读取时 err为null
   * 文件读取不到时 data为undefined
   */
});