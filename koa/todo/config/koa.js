const parser = require("koa-bodyparser");
const routes = require("../routes/routes");
const koa = require("koa");
const app = new koa();

app.use(parser());

//routes
routes(app);

module.exports = app;
