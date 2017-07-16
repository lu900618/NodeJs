// 参数中前两位成员没有什么意义
var argvs = process.argv.slice(2);

switch (argvs[0]) {
  case 'init':
    console.log("你需要init");
    break;
  case 'install':
    var installPacakageName = argvs[1];
    console.log("正在安装" + installPacakageName);
    break;
  case "uninstall":
    console.log("uninstall");
    break;
}