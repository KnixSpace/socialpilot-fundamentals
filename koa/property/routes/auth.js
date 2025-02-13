const Router = require("@koa/router");
const router = new Router({ prefix: "/api/v1/auth" });

const { register, login } = require("../controllers/auth");
const { validate } = require("../validators/validate");
const {
  validateRegisterName,
  validateLoginEmail,
  validateLoginPassword,
  validateRegisterEmail,
  validateRegisterPassword,
} = require("../validators/auth");
const { isValidCredentials } = require("../middlewares/auth");


router.post(
  "/register",
  validate([
    validateRegisterEmail,
    validateRegisterName,
    validateRegisterPassword,
  ]),
  register
);
router.post(
  "/login",
  validate([validateLoginEmail, validateLoginPassword]),
  isValidCredentials,
  login
);

module.exports = router;
