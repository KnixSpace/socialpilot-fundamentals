const { connectDB } = require("./config/database");
const koaApp = require("./config/koa");

//just checking deployment is off for this branch
const startApp = async () => {
  try {
    await connectDB();
    return koaApp;
  } catch (error) {
    console.log("Server fail to start :", error);
  }
};

module.exports = startApp;
