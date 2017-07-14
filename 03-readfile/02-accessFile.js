var fs = require("fs");

/**
 * 参数1 路径
 */
fs.access("./01-readfile.js", (err) => {
  // console.log(err ? 'no access' : 'can read/write');
  if (err) {
    throw err;
  }
  fs.read("./01-readfile.js", "utf8", (err, data) => {
    console.log(123);
  });
});