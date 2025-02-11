const Router = require("@koa/router");
const {
  createTodo,
  getAllTodos,
  removeTodo,
  downloadTodo,
} = require("../controllers");
const { isAuthenticated } = require("../middleware/auth");
const { validate } = require("../validators/validator");
const { title, description, params } = require("../validators/todo");
const { modifyTodo } = require("../controllers/todo");
const router = new Router({
  prefix: "/api/v1/todos",
});

router.get("/", isAuthenticated, getAllTodos);

router.post(
  "/create",
  isAuthenticated,
  validate([title, description]),
  createTodo
);

router.patch(
  "/update/:todoId",
  isAuthenticated,
  validate([params]),
  modifyTodo
);

router.delete(
  "/delete/:todoId",
  isAuthenticated,
  validate([params]),
  removeTodo
);
router.get("/download", isAuthenticated, downloadTodo);

module.exports = router;
