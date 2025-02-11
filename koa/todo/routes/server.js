const Router = require("@koa/router");
const router = new Router({ prefix: "/api/v1" });

router.get("/", (ctx) => {
  ctx.body = "Infinix is alive";
});

router.get("/properties/:id", (ctx) => {
  ctx.body = {
    origin: ctx.origin,
    originalUrl: ctx.originalUrl,
    url: ctx.url,
    idempotent: ctx.idempotent,
    ip: ctx.ip,
    state: ctx.state,
  };
});

module.exports = router;
