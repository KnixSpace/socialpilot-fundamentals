const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { status } = require("../constant");
const {
  getTodoByUserId,
  deleteTodo,
  saveTodo,
  updateTodo,
} = require("../db/todo");

const getAllTodos = async (ctx) => {
  const todos = await getTodoByUserId(ctx.request.user.userId);
  if (todos.length === 0) {
    ctx.status = 200;
    ctx.response.body = { message: "No todos found" };
    return;
  }
  ctx.status = 200;
  ctx.body = todos;
};

const createTodo = async (ctx) => {
  const { title, description } = ctx.request.body;
  const { userId } = ctx.request.user;
  const todo = {
    todoId: uuidv4(),
    title,
    description,
    status: status.PENDING,
    userId,
    createdOn: new Date(),
    updatedOn: new Date(),
  };
  await saveTodo(todo);
  ctx.response.status = 201;
  ctx.body = todo;
};

const removeTodo = async (ctx) => {
  const { todoId } = ctx.params;
  const { userId } = ctx.request.user;
  const { deletedCount } = await deleteTodo({ todoId, userId });
  if (deletedCount === 0) {
    ctx.response.status = 204;
    ctx.body = { message: "No todo found" };
    return;
  }
  ctx.response.status = 200;
  ctx.body = { message: "Todo deleted susseccfully" };
};

const modifyTodo = async (ctx) => {
  const { todoId } = ctx.params;
  const { userId } = ctx.request.user;
  const { matchedCount } = await updateTodo(
    { todoId, userId },
    ctx.request.body
  );
  if (matchedCount === 0) {
    ctx.response.status = 204;
    ctx.body = { message: "No todo found" };
    return;
  }
  ctx.response.status = 200;
  ctx.body = { message: "Todo updated successfully" };
};

const downloadTodo = async (ctx) => {
  const { userId } = ctx.request.user;
  const todos = await getTodoByUserId(userId);
  if (todos.length === 0) {
    ctx.status = 204;
    ctx.body = { message: "No todos found" };
    return;
  }
  await fs.promises
    .writeFile(
      `${ctx.request.user.userId.slice(0, 8)}.json`,
      JSON.stringify(todos, null, 2),
      "utf-8"
    )
    .catch((e) => {
      throw new Error(e);
    });

  ctx.status = 200;
  ctx.body = { message: "todo downloaded" };
};

module.exports = {
  createTodo,
  getAllTodos,
  removeTodo,
  modifyTodo,
  downloadTodo,
};
