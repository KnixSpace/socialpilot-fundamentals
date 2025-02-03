const fs = require("fs");
const { v4: uuidv4, parse: uuidParser } = require("uuid");
const { status } = require("../constant");
const { getTodo, deleteTodo, saveTodo } = require("../db/todo");

const getAllTodos = async (ctx) => {
  try {
    const todos = await getTodo(ctx.request.user.userId);
    if (todos.length === 0) {
      ctx.status = 200;
      ctx.response.body = { message: "No todos found" };
      return;
    }
    ctx.status = 200;
    ctx.body = todos;
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = { message: "Error in fetching todo:", error };
  }
};

const createTodo = async (ctx) => {
  try {
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
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = { message: "Error in creating todo:", error };
  }
};

const removeTodo = async (ctx) => {
  try {
    const { todoId } = ctx.params;
    const { userId } = ctx.request.user;
    if (!todoId) {
      ctx.response.status = 400;
      ctx.body = { message: "Todo id required" };
      return;
    }
    uuidParser(todoId);
    await deleteTodo(todoId, userId);
    ctx.response.status = 200;
    ctx.body = { message: "Todo delted susseccfully" };
  } catch (error) {
    console.log();
    if (error.message === "Error: No match found") {
      ctx.response.status = 404;
      ctx.body = {
        message: "No todos found",
      };
      return;
    }
    ctx.response.status = 500;
    ctx.body = {
      message: "Error in deleteing todo in db",
    };
  }
};

const downloadTodo = async (ctx) => {
  try {
    const todos = await getTodo();
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
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "error in downloading todo" };
  }
};

module.exports = { createTodo, getAllTodos, removeTodo, downloadTodo };
