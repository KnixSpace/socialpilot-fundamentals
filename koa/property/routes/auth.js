const Router = require("@koa/router");
const { register, login } = require("../controllers/auth");
const { validate } = require("../validators/validate");
const { email, password, name } = require("../validators/auth");
const router = new Router({ prefix: "/api/v1/auth" });

router.post("/register", validate([email, name, password]), register);
router.post("/login", validate([email, password]), login);

module.exports = router;
