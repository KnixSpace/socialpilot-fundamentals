const serverAliveRoutes = require("./server");
const todoRoutes = require("./todo");
const authRoutes = require("./auth");

module.exports = (app) => {
  app.use(serverAliveRoutes.routes());
  app.use(todoRoutes.routes());
  app.use(authRoutes.routes());
};
