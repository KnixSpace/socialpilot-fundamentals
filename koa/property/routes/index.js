const serverRoutes = require("./server");
const authRoutes = require("./auth");

module.exports = (app) => {
  app.use(serverRoutes.routes());
  app.use(authRoutes.routes());
};
