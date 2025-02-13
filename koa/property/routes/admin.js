const Router = require("@koa/router");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const { approveBroker } = require("../controllers/admin");
const { validate } = require("../validators/validate");
const { validateBroker, validateParams } = require("../validators/admin");
const router = new Router({ prefix: "/api/v1/admin" });

router.post(
  "/approve-broker/:brokerDataToken",
  isAuthenticated,
  isAdmin,
  validate([validateParams, validateBroker]),
  approveBroker
);

module.exports = router;
