const serverRoutes = require("./server");
const authRoutes = require("./auth");
const adminRoutes = require("./admin");
const propertyRoutes = require("./property");
const interestedRoutes = require("./interested");

module.exports = (app) => {
  app.use(serverRoutes.routes());
  app.use(authRoutes.routes());
  app.use(adminRoutes.routes());
  app.use(propertyRoutes.routes());
  app.use(interestedRoutes.routes());
};
