const fs = require("fs");

const filePath = __dirname + "/todos.json";

const loadTodos = () => {
  let data = null;
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") {
      fs.writeFileSync(filePath, "[]", "utf8");
      data = [];
    }
  }
  return data;
};

const saveTodos = (todos) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
  } catch (error) {
    console.log("Error in writing file");
  }
};

//get all todos
const getAllTodosController = () => {
  try {
    const todos = loadTodos();
    if (todos.length === 0) {
      console.log("No todos available...");
      return 0;
    }
    // console.table(todos);
    // return todos.length;
    return todos;
  } catch (error) {
    console.log(error);
  }
};

//register new todo
const registerTodoController = (newTodo) => {
  try {
    const todos = loadTodos();
    todos.push(newTodo);
    console.log("\nNew todo added succesfully\n");
    saveTodos(todos);
    return todos;
  } catch (error) {
    console.log(error);
  }
};

//update todo
const updateTodoController = (field, todoId, data) => {
  const todos = loadTodos();
  if (field === "d") {
    todos[todoId].task = data;
  } else {
    if (data === "d") {
      todos[todoId].status = "done";
    } else {
      todos[todoId].status = "pending";
    }
  }
  saveTodos(todos);
};

//delete todo
const deleteTodoController = (todoId) => {
  const todos = loadTodos();
  todos.splice(todoId, 1);
  saveTodos(todos);
};

module.exports = {
  getAllTodosController,
  registerTodoController,
  updateTodoController,
  deleteTodoController,
};
