// mk文件自动转换

const fs = require('fs');
const path = require('path');
const marked = require('marked');
const browserSync = require('browser-sync');


// 1.接收需要转换的路径
const target = path.join(__dirname, process.argv[2] || './readme.md');

// 转换为HTML后保存的位置
let filename = target.replace(path.extname(target), '.html');
// 获取HTML文件名
let indexpath = path.basename(filename);

// 监视并浏览器刷新
// 通过browserSync创建一个服务器
browserSync({
  server: path.dirname(target), // 网站根目录
  index: indexpath, //默认打开文档
  notify:false
});


// 监视文件的变化
fs.watchFile(target, { interval: 200 }, (curr, prev) => {
  // console.log(`current: ${curr.size}; previous: ${prev.size}`);

  // 判断文件有没有变化
  if (curr.mtime === prev.mtime) {
    return false;
  }

  // 读取文件 转换为HTML
  fs.readFile(target, 'utf8', (err, content) => {
    if (err) throw err;

    var html = marked(content);

    fs.readFile(path.join(__dirname, './github.css'), 'utf8', (err, styles) => {
      if (err) throw err;
      // html = template.replace('{{{conent}}}', html);
      // html = html.replace('{{{style}}}', styles);
      html = template.replace('{{{conent}}}', html).replace('{{{style}}}', styles);
      // fs.writeFile(target.replace('.md', '.html'), html, 'utf8', (err) => {
      //   console.log(err);
      // });
      // 考虑md文件的不同扩展名 markedown  md markd等
      fs.writeFile(filename, html, 'utf8', (err) => {
        // 通过browserSync发送一个消息给浏览器, 浏览器刷新
        browserSync.reload(indexpath);
        console.log(err);
      });
    });

  });
});

var template = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <!--<link rel="stylesheet" href="github.css">-->
  <style>{{{style}}}</style>
</head>
<body>
  <div class="vs">
    {{{conent}}}
  </div>
</body>
</html>
`;