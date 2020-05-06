const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
  ctx.body = [{ name: 'zs' }];
  next();
});

app.use((ctx, next) => {
  if (ctx.url === '/html') {
    ctx.type = 'text/html;charset=utf-8'
    ctx.body = `我的名字是${ctx.body[0].name}`
  }

});
app.listen(3000);
