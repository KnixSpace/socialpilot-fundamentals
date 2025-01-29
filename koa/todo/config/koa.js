const parser = require("koa-bodyparser");
const routes = require("../routes/index");
const koa = require("koa");
const app = new koa();

app.use(parser());

//routes
routes(app);

module.exports = app;
