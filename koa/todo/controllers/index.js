const { registerUser, loginUser } = require("./auth");
const { createTodo, getAllTodos, removeTodo, downloadTodo } = require("./todo");

module.exports = {
  getAllTodos,
  createTodo,
  removeTodo,
  downloadTodo,
  registerUser,
  loginUser,
};
