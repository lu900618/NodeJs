// 创建多层文件夹
const fs = require("fs");
const path = require("path");
const mkdirs = require("./mkdirsPro");

mkdirs("demo1/demo3/demo2", err => {
  console.log(err);
});