const { client } = require("../config/database");
const userCollection = client.db("koa-todos").collection("users");

const saveUser = async (user) => {
  try {
    await userCollection.insertOne(user);
    return user;
  } catch (error) {
    console.error("Error in saving user", error);
    throw new Error("Erro in saving user to db");
  }
};

const getUser = async (email) => {
  try {
    return await userCollection.findOne({ email });
  } catch (error) {
    console.error("Error in retriving user", error);
    throw new Error("Error in retriving user");
  }
};

module.exports = { saveUser, getUser };
