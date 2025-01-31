const Router = require("@koa/router");
const {
  createTodo,
  getAllTodos,
  removeTodo,
  downloadTodo,
} = require("../controllers");
const { isAuthenticated } = require("../middleware/auth");
const { isEmail } = require("../validators/miscellaneous");
const { validate } = require("../validators/validator");
const router = new Router({
  prefix: "/api/v1/todos",
});

router.get("/", getAllTodos);
router.post("/create", isAuthenticated, createTodo);
router.delete("/delete/:todoId", isAuthenticated, removeTodo);
router.get("/download", isAuthenticated, downloadTodo);
router.post("/validate", validate([[isEmail, "email"]]), (ctx) => {
  ctx.body = "validating";
});

module.exports = router;
