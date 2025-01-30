const { client } = require("../config/database");
const todosCollection = client.db("koa-todos").collection("todos");

const saveTodo = async (todo) => {
  try {
    await todosCollection.insertOne(todo);
  } catch (error) {
    console.error("Error in saving todo");
    throw new Error("Erro in saving todo to db");
  }
};

const getTodo = async () => {
  try {
    return await todosCollection.find({}, { projection: { _id: 0 } }).toArray();
  } catch (error) {
    console.error("Error in fetching todo");
    throw new Error("Erro in fetching todo to db");
  }
};

const deleteTodo = async (todoId) => {
  try {
    await todosCollection.deleteOne({ todoId });
  } catch (error) {
    console.error("Error in deleting todo");
    throw new Error("Erro in deleting todo to db");
  }
};

module.exports = { saveTodo, getTodo, deleteTodo };
