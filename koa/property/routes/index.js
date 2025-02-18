const serverRoutes = require("./server");
const authRoutes = require("./auth");
const adminRoutes = require("./admin");
const propertyRoutes = require("./property");

module.exports = (app) => {
  app.use(serverRoutes.routes());
  app.use(authRoutes.routes());
  app.use(adminRoutes.routes());
  app.use(propertyRoutes.routes());
};
