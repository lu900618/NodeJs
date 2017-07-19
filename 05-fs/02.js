const fs = require("fs");

// 读取图片 图片转base64编码
fs.readFile("D:\\个人文件\\壁纸\\475931.jpg", (error, data) => {
  console.log(data.toString('base64'));
});