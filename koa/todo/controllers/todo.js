const { v4: uuidv4 } = require("uuid");
const { client } = require("../config/database");
const { status } = require("../constant");

const todosCollection = client.db("koa-todos").collection("todos");

//get all todos
const getTodosList = async () => {
  try {
    const todos = await todosCollection
      .find({}, { projection: { _id: 0 } })
      .toArray();
    return todos || [];
  } catch (error) {
    console.log("Error in fetching todos", error);
  }
};

//create todo
const createTodo = async ({ title, description }) => {
  try {
    const todo = {
      todoId: uuidv4(),
      title,
      description,
      status: status.PENDING,
      createdOn: new Date(),
      updatedOn: new Date(),
    };

    await todosCollection.insertOne(todo);
    return todo;
  } catch (error) {
    console.error("Error in saving todo:", error);
  }
};

//delete todo
const deleteTodo = async ({ todoId }) => {
  try {
    await todosCollection.deleteOne({ todoId });
  } catch (error) {
    console.log("Error in deleting todo", error);
  }
};

module.exports = { createTodo, getTodosList, deleteTodo };

