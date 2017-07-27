process
===

> `process`是全局变量, 访问时, 不用使用`require`命令.

属性
---

+ `process.pid`：当前进程的进程号。
+ `process.version`：Node的版本，比如v0.10.18。
+ `process.platform`：当前系统平台，比如Linux。
+ `process.title`：默认值为“node”，可以自定义该值。
+ `process.argv`：当前进程的命令行参数数组。
  ```jsvascript
  node test.js a, b, c // 运行node时输入
  [ 'C:\\Program Files\\nodejs\\node.exe', 'D:\\NodeJs\\03-proccess\\test.js', 'a', 'b', 'c' ] // 输出第一个参数永远是node的位置
  ```
+ `process.env`：指向当前shell的环境变量，比如process.env.HOME。
+ `process.execPath`：运行当前进程的可执行文件的绝对路径。
+ `process.stdout`：指向标准输出。
  `process.stdout.write('hello\n');`
+ `process.stdin`：指向标准输入。
+ `process.stderr`：指向标准错误。

方法
---
+ `process.exit()`：退出当前进程。
+ `process.cwd()`：返回运行当前脚本的工作目录的路径。_
+ `process.chdir()`：改变工作目录。
+ `process.nextTick()`：将一个回调函数放在下次事件循环的顶部。


path
===

> 用于处理目录

引入`path`模块: `const path = require('path);`

方法
---

+ `path.join()` 拼合路径
  `path.join(__dirname, '../04-path/readme.md');`
+ `path.basename()` 获取文件名
  `path.basename(temp); // 完整文件名 readme.md `
  `path.basename(temp, ".md"); // 不包含后缀名 readme`
+ `path.delimiter()` 获取不同操作系统的分隔符
  环境变量-win->`;`  linux->`:`
+ `process.env.PATH` 获取环境变量
  `console.log(process.env.PATH.split(path.delimiter));`
+ `path.dirname()` 获取目录名
+ `path.extname()` 获取扩展名
+ `path.parse()` 将路径字符串转换为对象
  `let obj = path.parse(temp);`
+ `path.format` 将对象转换为路径字符串
  `console.log(path.format(obj));`
+ `path.isAbsolute()` 判断是否是绝对路径
+ `path.normalize()` 常规化路径
  `path.normalize("C:/dev\\abc//cba////1.txt");`
+ `relative(from, to)` 获取`from`到`to`的相对路径
+ `path.resolve()` 和jion类似 参数中有盘符时到盘符
+ `path.sep` 分隔符
  
file
===

> 标准文件操作API

引入`fs`模块 `const fs = require('fs');`

方法
---
+ 读取文件
  `fs.readFile('./01.js', 'utf8', callback); // 文件名[路径] 编码 回调函数`
  + 不指定编码, 返回的是`buffer`
  + `readFile`虽然采用了`buffer`,但是是一次性读取.
  ```javascript
  fs.readFile('./01.js', (err, data) => {
    if (err) throw err;
    console.log(data);
  });

  // 读取图片 图片转base64编码
  fs.readFile("D:\\个人文件\\壁纸\\475931.jpg", (error, data) => {
    if (err) throw err;
    console.log(data.toString('base64'));
  });
  ```
  `fs.readFileSync(path[, options]);` 
  + `fs.readFile()` 的同步版本
  + 指定了编码返回字符串, 否则返回buffer
  ```javascript
  let data= fs.readFileSync('./01.js', 'utf8');
  ```
+ 检查到指定path路径的目录或者文件的操作权限
  `fs.access('./01.js', callback)`
  ```javascript
  // 检测文件是否存在
  fs.access('test.txt', (err)=>{
    console.log(err ? '文件不存在':'文件存在');
  });
  ```
  + fs.constants.F_OK - path 文件对调用进程可见。 这在确定文件是否存在时很有用，但不涉及 rwx 权限。 如果没指定 mode，则默认为该值。
  + fs.constants.R_OK - path 文件可被调用进程读取。
  + fs.constants.W_OK - path 文件可被调用进程写入。
  + fs.constants.X_OK - path 文件可被调用进程执行。 对 Windows 系统没作用（相当于 fs.constants.F_OK）。
  ```javascript
  // 检测对文件是否有读写权限
  fs.access('test.txt', fs.constants.R_OK | fs.constants.W_OK, (err)=>{
    console.log(err ? '文件不可读写':'文件可读写');
  });
  ```
  **不建议在调用 fs.open() 、 fs.readFile() 或 fs.writeFile() 之前使用 fs.access() 检查一个文件的可访问性。**

+ 读取流
  `fs.createReadStream(path[, options])` 返回`ReadStream`对象
  ```javascript
  // 从一个 100 字节长的文件中读取最后 10 个字节
  let rs = fs.createReadStream('sample.txt', { start: 90, end: 99 });
  ```
+ 文件写入
  `fs.writeFile(file, data[, options], callback)`
  + 如果文件存在, 替换文件
  ```javascript
  fs.writeFile('message.txt', 'Hello Node.js', 'utf8', callback);
  ```
  `fs.writeFileSync(file, data[, options])` 
  + `fs.writeFile()` 的同步版本
  + 返回值是`undefined`
+ 写入流
  `fs.createWriteStream(path[, options])` 返回一个新建的`WriteStream`对象
  ```javascript
  let ws = fs.createWriteStream(path.join(__dirname, 'temp.txt'));
  ```

+ 文件重命名
  `fs.rename(oldPath, newPath, callback)`
  ```javascript
  const fs = require("fs");
  const path = require('path');

  var currentPath = path.join(__dirname, 'temp.txt');
  var targetPath = path.join(__dirname, 'temp1.txt');

  fs.rename(currentPath, targetPath);// 可以重命名的同时移动文件
  ```
  ```javascript
  // 文件的复制
  const fs = require('fs');
  const path = require('path');

  // 创建文件流, 并没有读取真实的数据
  let reader = fs.createReadStream('D:\\迅雷下载\\cn_office_professional_plus_2016_x86_x64_dvd_6969182.iso');
  // 创建文件写入流
  let writer = fs.createWriteStream('D:\\迅雷下载\\test.iso');

  fs.stat('D:\\迅雷下载\\cn_office_professional_plus_2016_x86_x64_dvd_6969182.iso', (err, stats) => {
    if (stats) {
      let readTotal = 0;
      reader.on('data', (chunk) => {
        writer.write(chunk, (err) => {
          console.log(((readTotal += chunk.length) / stats.size * 100) + '%');
        });
      });
    }
  });
  ```
+ pipe 管道
  `readable.pipe(destination[, options])`
  ```javascript
  const fs = require('fs');
  const path = require('path');

  // 创建文件流, 并没有读取真实的数据
  var reader = fs.createReadStream('D:\\迅雷下载\\cn_office_professional_plus_2016_x86_x64_dvd_6969182.iso');
  // 创建文件写入流
  var writer = fs.createWriteStream('D:\\迅雷下载\\test.iso');

  reader.pipe(writer);
  ```


