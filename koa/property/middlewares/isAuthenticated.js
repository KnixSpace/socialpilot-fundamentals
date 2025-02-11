const { isUser } = require("../db/user");
const { verifyJwtToken } = require("../utils/jwt");

const isAuthenticated = async (ctx, next) => {
  const token = ctx.headers.authorization.split(" ")[1];
  const user = verifyJwtToken(token);
  if (!user) {
    ctx.status = 401;
    ctx.body = { message: "unauthorized" };
    return;
  }

  const validUser = await isUser({ userId: user.userId });
  if (!validUser) {
    ctx.status = 401;
    ctx.body = { message: "unauthorized" };
    return;
  }

  ctx.request.user = user;
  next();
};

module.exports = { isAuthenticated };
