const { v4: uuidv4, parse: uuidParser } = require("uuid");
const { client } = require("../config/database");
const { status } = require("../constant");
const { getTodo, deleteTodo } = require("../db/todo");

const todosCollection = client.db("koa-todos").collection("todos");

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
    throw new Error("Erro in fetching todo");
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
    await todosCollection.insertOne(todo);
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

module.exports = { createTodo, getAllTodos, removeTodo };
