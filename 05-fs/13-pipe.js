// 文件的复制 -- 使用文件流


const fs = require('fs');
const path = require('path');

// 创建文件流, 并没有读取真实的数据
var reader = fs.createReadStream('D:\\迅雷下载\\cn_office_professional_plus_2016_x86_x64_dvd_6969182.iso');
// 创建文件写入流
var writer = fs.createWriteStream('D:\\迅雷下载\\test.iso');

reader.pipe(writer);
