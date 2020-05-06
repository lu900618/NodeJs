const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class KKoa {
  // 初始化中间件数组
  constructor() {
    this.middlewares = [];
  }
  listen(...args) {
    const server = http.createServer(async (req, res) => {
      // 构建上下文
      const ctx = this.createContext(req, res);
      // 中间件合成
      const fn = this.compose(this.middlewares)
      await fn(ctx)
      // this.callback(ctx);
      res.end(ctx.body);
    });
    server.listen(...args);
  }
  // use(callback) {
  //   this.callback = callback;
  // }
  use(middleware) {
    this.middlewares.push(middleware);
  }
  // 构建上下文
  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }
  compose(middleware) {
    return function (ctx) {
      return dispatch(0);

      function dispatch(i) {
        let fn = middleware[i];
        if (!fn) {
          return Promise.resolve();
        }
        return Promise.resolve(
          fn(ctx, function next() {
            return dispatch(i + 1);
          })
        );
      }
    };
  }
}

module.exports = KKoa;
