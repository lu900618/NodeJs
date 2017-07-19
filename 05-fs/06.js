// 移动文件和重命名

const fs = require("fs");
const path = require('path');

var currentPath = path.join(__dirname, 'temp.txt');
var targetPath = path.join(__dirname, 'temp1.txt');

fs.rename(currentPath, targetPath);// 可以重命名的同时移动文件
