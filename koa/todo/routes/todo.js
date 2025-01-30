const Router = require("@koa/router");
const {
  createTodo,
  getAllTodos,
  removeTodo,
} = require("../controllers");
const { isAuthenticated } = require("../middleware/auth");
const router = new Router({
  prefix: "/api/v1/todos",
});

router.get("/", getAllTodos);
router.post("/create", createTodo);
router.delete("/delete/:todoId", removeTodo);

module.exports = router;
