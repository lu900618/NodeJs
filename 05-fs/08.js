// 递归目录树


const fs = require("fs");
const path = require("path");
require('./proto.js');

// 获取当前有没有传入目标路径
var target = path.join(__dirname, process.argv[2] || './');
load(target,0);


function load(target, deep) {
  
  var prefix = new Array(deep + 1).join('| ');

  // 使用同步的方式
  var dirinfos = fs.readdirSync(target);

  var dirs = [];
  var files = [];
  dirinfos.forEach((info) => {
    var stats = fs.statSync(path.join(target, info));
    if (stats.isFile()) {
      files.push(info);
    } else {
      dirs.push(info);
    }
  });
  // ┝ ━┗

  dirs.forEach(dir => {
    console.log(`${prefix}┝━${dir}`);
    load(path.join(target, dir),deep+1)
  });

  var count = files.length - 1;
  files.forEach(file => {
    console.log(`${prefix}${count-- ? "┝" : "┗"}━${file}`);
  });
}