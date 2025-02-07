require("dotenv").config();
const { connectDB } = require("./config/database");
const app = require("./config/koa");

const PORT = process.env.PORT || 3000;

const initializeServer = async () => {
  await connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log("Server strated");
      });
    })
    .catch(() => {
      console.log("Error in Server");
    });
};

initializeServer();
