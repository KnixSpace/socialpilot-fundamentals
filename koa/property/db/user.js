const { client } = require("../config/database");
const userCollection = client.db(process.env.DB_NAME).collection("user");

const isUser = async (filters) => await userCollection.countDocuments(filters);

const saveUser = async (userData) => await userCollection.insertOne(userData);

const getUser = async (filters, options) =>
  await userCollection.findOne(filters, options);

const updateUser = async (filters, data) => {
  data.updatedOn = new Date();
  return await userCollection.updateOne(filters, { $set: data });
};

module.exports = { isUser, saveUser, getUser, updateUser };
