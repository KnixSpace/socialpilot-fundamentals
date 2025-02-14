const parser = require("koa-bodyparser");
const KOA = require("koa");
const app = new KOA();

const routes = require("../routes/index");

app.use(parser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error.message } || "error occured";
  }
});

routes(app);

module.exports = app;
