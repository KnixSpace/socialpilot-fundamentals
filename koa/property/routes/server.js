const Router = require("@koa/router");
const router = new Router();

router.get("/", (ctx) => (ctx.body = "server is running fantastic"));

module.exports = router;
