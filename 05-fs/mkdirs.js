// 深层创建文件夹
const fs = require("fs");
const path = require("path");

function mkdirs(pathname, callback) {
  // 1. 解析pathname
  // 判断路径是否是绝对路径
  pathname = path.isAbsolute(pathname) ? pathname : path.join(__dirname, pathname);
  // 获取要创建的部分
  // let relativePath = pathname.replace(__dirname, '');
  let relativePath = path.relative(__dirname, pathname);
  let folders = relativePath.split(path.sep);
  try {
    let pre = '';
    folders.forEach(folder => {
      console.log(pre);
      fs.mkdirSync(path.join(__dirname, pre, folder));
      pre = path.join(pre, folder);
    });
    callback && callback(null);
  } catch (error) {
    callback && callback(error);
  }
}


module.exports = mkdirs;