const fs = require("fs");
const { v4: uuidv4, parse: uuidParser } = require("uuid");
const { status } = require("../constant");
const { getTodo, deleteTodo, saveTodo } = require("../db/todo");

const getAllTodos = async (ctx) => {
  try {
    const todos = await getTodo();
    if (todos.length === 0) {
      ctx.status = 204;
      ctx.body = { message: "No todos found" };
      return;
    }
    ctx.status = 200;
    ctx.body = todos;
  } catch (error) {
    console.error("Error in fetching todo");
    throw new Error("Error in fetching todo");
  }
};

const createTodo = async (ctx) => {
  try {
    const { title, description } = ctx.request.body;
    const todo = {
      todoId: uuidv4(),
      title,
      description,
      status: status.PENDING,
      createdOn: new Date(),
      updatedOn: new Date(),
    };
    await saveTodo(todo);
    ctx.status = 201;
    ctx.body = todo;
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = { message: "Error in saving todo:" };
    console.error("Error in saving todo:", error);
  }
};

const removeTodo = async (ctx) => {
  try {
    if (!ctx.params.todoId) {
      ctx.response.status = 400;
      ctx.body = { message: "Todo id required" };
      return;
    }
    uuidParser(ctx.params.todoId);
    await deleteTodo(ctx.params.todoId);
    ctx.response.status = 200;
    ctx.body = { message: "Todo delted susseccfully" };
  } catch (error) {
    console.error("Error in deleteing todo in db", error);
    ctx.response.status = 500;
    ctx.body = { message: "Error in deleteing todo in db" };
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

    await fs.promises.writeFile(
      `${ctx.request.user.userId.slice(0, 8)}.json`,
      JSON.stringify(todos, null, 2),
      "utf-8"
    );

    ctx.status = 200;
    ctx.body = { message: "todo downloaded" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: "error in downloading todo" };
    console.error("Error in downloading todo");
    throw new Error("Error in downloading todo");
  }
};

module.exports = { createTodo, getAllTodos, removeTodo, downloadTodo };
