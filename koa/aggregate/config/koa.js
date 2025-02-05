const parser = require("koa-bodyparser");
const routes = require("../routes/index");
const Koa = require("koa");
const app = new Koa();

app.use(parser());

routes(app);

module.exports = app;
