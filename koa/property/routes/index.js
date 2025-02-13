const serverRoutes = require("./server");
const authRoutes = require("./auth");
const adminRoutes = require("./admin");

module.exports = (app) => {
  app.use(serverRoutes.routes());
  app.use(authRoutes.routes());
  app.use(adminRoutes.routes());
};
