const { parse: uuidParser } = require("uuid");
const Router = require("@koa/router");
const {
  createTodo,
  getTodosList,
  deleteTodo,
} = require("../controllers/todo.controller");
const router = new Router({
  prefix: "/api/v1/todos",
});

//get all todo
router.get("/", async (ctx) => {
  try {
    const todos = await getTodosList();
    ctx.response.status = 200;
    if (todos.length === 0) {
      ctx.body = { message: "No toes found..." };
      return;
    }
    ctx.body = todos;
  } catch (error) {
    console.log(error);
    ctx.response.status = 500;
    ctx.body = {
      message: "Failed to fetch todos...",
    };
  }
});

//add new todo
router.post("/create", async (ctx) => {
  try {
    const requestBody = ctx.request.body;
    if (!requestBody.title && !requestBody.description) {
      ctx.response.status = 400;
      ctx.body = {
        message: "Title and description is required",
      };
      return;
    } else if (!requestBody.title) {
      ctx.response.status = 400;
      ctx.body = {
        message: "Title is required",
      };
      return;
    } else if (!requestBody.description) {
      ctx.response.status = 400;
      ctx.body = {
        message: "Description is required",
      };
      return;
    } else {
      const result = await createTodo(requestBody);
      ctx.response.status = 200;
      ctx.body = result;
    }
  } catch (error) {
    console.log(error);
    ctx.response.status = 500;
    ctx.body = { message: "Failed to add todo in db", error };
  }
});

//delete todo
router.delete("/delete/:todoId", async (ctx) => {
  try {
    if (!ctx.params.todoId) {
      ctx.response.status = 400;
      ctx.body = { message: "Todo id required" };
      return;
    }
    uuidParser(ctx.params.todoId);
    await deleteTodo(ctx.params);
    ctx.response.status = 200;
    ctx.body = { message: "Todo delted susseccfully" };
  } catch (error) {
    console.error("Error in deleteing todo in db", error);
    ctx.response.status = 500;
    ctx.body = { message: "Error in deleteing todo in db" };
  }
});

module.exports = router;
