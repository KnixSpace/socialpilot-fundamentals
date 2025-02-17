const { userRole } = require("../constants/constant");
const { readUser } = require("../db/user");
const { verifyJwtToken } = require("../utils/jwt");
const { validatePassword } = require("../utils/password");

const PRIVATE_KEY = process.env.JWT_PASSWORD_KEY;

const isAuthenticated = async (ctx, next) => {
  const token = ctx.headers?.authorization?.split(" ")[1];
  const user = verifyJwtToken(token, PRIVATE_KEY);
  if (!user) {
    ctx.status = 401;
    ctx.body = { message: "unauthorized" };
    return;
  }

  const userData = await readUser(
    { userId: user.userId },
    { projection: { password: 0, _id: 0, createdOn: 0, updatedOn: 0 } }
  );

  if (!userData) {
    ctx.status = 401;
    ctx.body = { message: "unauthorized" };
    return;
  }

  ctx.request.user = userData;
  return next();
};

const isAdmin = async (ctx, next) => {
  const { role } = ctx.request.user;
  if (role !== userRole.admin) {
    ctx.status = 401;
    ctx.body = { message: "you are not admin" };
    return;
  }
  return next();
};

const isValidCredentials = async (ctx, next) => {
  const { email, password } = ctx.request.body;
  const user = await readUser(
    { email },
    { projection: { _id: 0, createdOn: 0, updatedOn: 0 } }
  );

  if (!user) {
    ctx.status = 401;
    ctx.body = { message: "email or password is not valid" };
    return;
  }

  if (!(await validatePassword(password, user.password))) {
    ctx.status = 401;
    ctx.body = { message: "email or password is not valid" };
    return;
  }

  if (user.role === userRole.broker && !user.approvedByAdmin) {
    ctx.status = 403;
    ctx.body = { message: "pending admin approval" };
    return;
  }

  delete user.password;

  ctx.request.user = user;
  return next();
};

module.exports = { isAuthenticated, isValidCredentials, isAdmin };
