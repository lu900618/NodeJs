// require操作的时候就是去硬盘读取js文件
// 把module放入缓存
var klass = require('./klass');

klass.add("Scott", ["李白", "杜甫", "李清照"]);

// console.log(module);