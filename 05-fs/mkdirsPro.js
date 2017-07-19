// 深层创建文件夹
const fs = require("fs");
const path = require("path");

function mkdirs(pathname, callback) {
  // module.parent 谁调用了这个模块module.parent就是谁
  let root = path.dirname(module.parent.filename);

  // 1. 解析pathname
  // 判断路径是否是绝对路径
  pathname = path.isAbsolute(pathname) ? pathname : path.join(root, pathname);
  // 获取要创建的部分
  // let relativePath = pathname.replace(root, '');
  let relativePath = path.relative(root, pathname);
  let folders = relativePath.split(path.sep);
  try {
    let pre = '';
    folders.forEach(folder => {
      try {
        // 文件不存在报错
        fs.statSync(path.join(root, pre, folder));
      } catch (error) {
        // 文件不错在创建
        fs.mkdirSync(path.join(root, pre, folder)); 
      }  
      pre = path.join(pre, folder);
    });
    callback && callback(null);
  } catch (error) {
    callback && callback(error);
  }
}


module.exports = mkdirs;