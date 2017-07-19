
const path = require("path");

const temp = path.join(__dirname, '../04-path/readme.md');

// 获取文件名,  第二个参数是去掉扩展名
console.log(path.basename(temp));
console.log(path.basename(temp, ".md"));

// 获取不同操作系统的分隔符
// 环境变量-win->;  linux->:
console.log(path.delimiter);

// 获取环境变量
console.log(process.env.PATH);

console.log(process.env.PATH.split(path.delimiter));

// 获取目录名
console.log(path.dirname(temp));

// 获取扩展名
console.log(path.extname(temp));// 包含.

// 将路径字符串转换为对象
obj = path.parse(temp);
console.log(obj);

//  将对象转换为路径字符串
console.log(path.format(obj));

// 判断路径是否是绝对路径
console.log(path.isAbsolute(temp));

// 拼合路径
path.join();

// 常规化一个路径
let a = path.normalize("C:/dev\\abc//cba////1.txt");
console.log(a);

let from = "", to = "";
// 获取 to 到 from的相对路径
path.relative(from, to);

// 和jion类似 参数中有盘符时到盘符
path.resolve()

// 分隔符
path.sep()