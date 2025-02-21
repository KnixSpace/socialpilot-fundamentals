const { connectDB } = require("./config/database");
const koaApp = require("./config/koa");

const startApp = async () => {
  try {
    await connectDB();
    return koaApp;
  } catch (error) {
    console.log("Server fail to start :", error);
  }
};

//in koa-aggregate

module.exports = startApp;
