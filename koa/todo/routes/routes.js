const serverAliveRoutes = require("./server");
const todoRoutes = require("./todo");

module.exports = (app) => {
  app.use(serverAliveRoutes.routes());
  app.use(todoRoutes.routes());
};
