const parser = require("koa-bodyparser");
const KOA = require("koa");
const app = new KOA();

const routes = require("../routes/index");

app.use(parser());

routes(app);

module.exports = app;
