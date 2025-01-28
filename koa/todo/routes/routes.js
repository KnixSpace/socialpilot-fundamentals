const serverAliveRoutes = require("./server.status.routes");
const todoRoutes = require("./todo.routes");

module.exports = (app) => {
  app.use(serverAliveRoutes.routes());
  app.use(todoRoutes.routes());
};
