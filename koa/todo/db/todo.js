const { client } = require("../config/database");
const todosCollection = client.db("koa-todos").collection("todos");

const saveTodo = async (todo) => await todosCollection.insertOne(todo);

const getTodoByUserId = async (userId) =>
  await todosCollection.find({ userId }, { projection: { _id: 0 } }).toArray();

const deleteTodo = async (filter) => await todosCollection.deleteOne(filter);

const updateTodo = async (filter, updateData) => {
  updateData.updatedOn = new Date();
  return await todosCollection.updateOne(filter, {
    $set: updateData,
  });
};

module.exports = { saveTodo, getTodoByUserId, deleteTodo, updateTodo };
