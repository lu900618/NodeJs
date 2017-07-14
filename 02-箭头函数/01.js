// 一个参数一个返回值
var foo = function (v) {
  return v;
}

var foo = v => v;

// 两个参数 返回值
var foo1 = function (v1, v2) {
  return v1 + v2;
}

var foo1 = (v1, v2) => v1 + v2;

// 两个参数没有返回值
var foo2 = function (v1, v2) {

}

var foo2 = (v1, v2) => { }

// 没有参数没有返回值
var foo2 = function () {

}

var foo2 = () => { }
// 没有参数有返回值
var foo2 = function () {
  return 1;
}

var foo2 = () => 1;