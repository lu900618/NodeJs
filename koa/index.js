const KKoa = require('./kkoa');

const app = new KKoa();

// app.use(ctx => {
//   ctx.body = "haahahhaahahah"
// })
const delay = () => Promise.resolve(resolve => setTimeout(() => resolve(), 2000));


app.use(async (ctx, next) => {
    ctx.body = "1";
    setTimeout(() => {
        ctx.body += "2";
    }, 2000);
    await next();
    ctx.body += "3";
});

app.use(async (ctx, next) => {
    ctx.body += "4";
    await delay();
    await next();
    ctx.body += "5";
});

app.use(async (ctx, next) => {
    ctx.body += "6";
});

app.listen(4000, () => {
  console.log('server is running at http://localhost:4000');
}); 
