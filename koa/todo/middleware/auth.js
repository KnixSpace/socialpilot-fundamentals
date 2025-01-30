const { verifyJwtToken } = require("../utils/jwt");

const isAuthenticated = (ctx, next) => {
  const token = ctx.request.header.authorization;
  if (!token) {
    ctx.status = 401;
    ctx.body = { message: "Unauthorized" };
    return;
  }
  ctx.request.user = verifyJwtToken(token.split(" ")[1]);
  return next();
};

module.exports = { isAuthenticated };
