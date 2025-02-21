require("dotenv").config();
const app = require("./config/koa");
const { connectDB } = require("./config/database");

const PORT = process.env.PORT || 3000;

const initializeServer = async () => {
  console.log("Koa server initialized");
  await connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Koa server is alive on ${PORT}`);
    });
  });
};

//done

initializeServer();
