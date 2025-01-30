const { registerUser, loginUser } = require("./auth");
const { createTodo, getAllTodos, removeTodo } = require("./todo");

module.exports = {
  getAllTodos,
  createTodo,
  removeTodo,
  registerUser,
  loginUser,
};
