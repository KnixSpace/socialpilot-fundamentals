const Router = require("@koa/router");
const router = new Router();

router.get("/", (ctx) => {
  ctx.body = "Infinix is alive";
});

module.exports = router;
