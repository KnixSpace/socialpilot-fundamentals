const Router = require("@koa/router");
const { registerUser, loginUser } = require("../controllers");
const router = new Router({ prefix: "/api/v1/auth" });

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
