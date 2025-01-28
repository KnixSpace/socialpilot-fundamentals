const serverAliveRoutes = require("./server.status.routes");

module.exports = (app) => {
  app.use(serverAliveRoutes.routes());
};
