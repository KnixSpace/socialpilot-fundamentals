const serverRoutes = require("./server");

module.exports = (app) => {
  app.use(serverRoutes.routes());
};
