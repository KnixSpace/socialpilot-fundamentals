const startApp = require("./app");

const PORT = process.env.PORT || 3000;

const initializeServer = async () => {
  console.log("Koa server initialized");
  const app = await startApp();
  if (app) {
    app.listen(PORT, () => {
      console.log(`Koa server is alive on ${PORT}`);
    });
  }
};

initializeServer();
