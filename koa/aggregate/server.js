const { connectDB } = require("./config/database");
const app = require("./config/koa");

const startServer = async () => {
  console.log("Server starting...");
  connectDB()
    .then(() => {
      app.listen(3000, () => {
        console.log("Koa server started...");
      });
    })
    .catch(() => {
      console.log("Error in starting server");
    });
};

startServer();
