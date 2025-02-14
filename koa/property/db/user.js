const { client } = require("../config/database");
const userCollection = client.db(process.env.DB_NAME).collection("user");

const isUser = async (filters) => await userCollection.countDocuments(filters);

const createUser = async (userData) => await userCollection.insertOne(userData);

const readUser = async (filters, options) =>
  await userCollection.findOne(filters, options);

const updateUser = async (filters, data) =>
  await userCollection.updateOne(filters, {
    $set: { ...data, updatedOn: new Date() },
  });

module.exports = { isUser, createUser, readUser, updateUser };
