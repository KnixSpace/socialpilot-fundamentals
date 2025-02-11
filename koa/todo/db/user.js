const { client } = require("../config/database");
const userCollection = client.db("koa-todos").collection("users");

const saveUser = async (user) => await userCollection.insertOne(user);

const isUser = async (filter) => await userCollection.countDocuments(filter);

const getUser = async (filter, options) =>
  await userCollection.findOne(filter, options);

module.exports = { saveUser, getUser, isUser };
