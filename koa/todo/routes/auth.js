const Router = require("@koa/router");
const { registerUser, loginUser } = require("../controllers");
const { validate } = require("../validators/validator");
const { name, email, password } = require("../validators/auth");
const router = new Router({ prefix: "/api/v1/auth" });

router.post("/register", validate([name, email, password]), registerUser);
router.post("/login", validate([email, password]), loginUser);

module.exports = router;
