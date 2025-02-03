const { client } = require("../config/database");
const todosCollection = client.db("koa-todos").collection("todos");

const saveTodo = async (todo) => {
  try {
    await todosCollection.insertOne(todo);
  } catch (error) {
    throw new Error("Erro in saving todo to db");
  }
};

const getTodo = async (userId) => {
  try {
    return await todosCollection
      .find({ userId }, { projection: { _id: 0 } })
      .toArray();
  } catch (error) {
    console.error("Error in fetching todo");
    throw new Error("Error in fetching todo to db");
  }
};

const deleteTodo = async (todoId, userId) => {
  try {
    const { deletedCount } = await todosCollection.deleteOne({
      todoId,
      userId,
    });
    if (!deletedCount) {
      throw new Error("No match found");
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { saveTodo, getTodo, deleteTodo };
