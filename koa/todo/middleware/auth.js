const { isUser } = require("../db/user");
const { verifyJwtToken } = require("../utils/jwt");

const isAuthenticated = async (ctx, next) => {
  const token = ctx.request.header.authorization;
  if (!token) {
    ctx.status = 401;
    ctx.body = { message: "Unauthorized" };
    return;
  }

  const user = verifyJwtToken(token.split(" ")[1]);

  if (!user) {
    ctx.status = 401;
    ctx.body = { message: "Unauthorized" };
    return;
  }

  if (!(await isUser({ userId: user.userId }))) {
    ctx.status = 401;
    ctx.body = { message: "unauthorized" };
    return;
  }

  ctx.request.user = user;
  return next();
};

module.exports = { isAuthenticated };
