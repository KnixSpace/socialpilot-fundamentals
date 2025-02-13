const { ROLE } = require("../constants/constant");
const { isUser, getUser } = require("../db/user");
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

  const validUser = await isUser({ userId: user.userId });
  if (!validUser) {
    ctx.status = 401;
    ctx.body = { message: "unauthorized" };
    return;
  }

  ctx.request.user = user;
  return next();
};

const isValidCredentials = async (ctx, next) => {
  const { email, password } = ctx.request.body;
  if (!(await isUser({ email }))) {
    ctx.status = 401;
    ctx.body = { message: "email or password is not valid" };
    return;
  }

  const {
    role,
    approvedByAdmin,
    password: hashPassword,
  } = await getUser(
    { email },
    { projection: { _id: 0, password: 1, role: 1, approvedByAdmin: 1 } }
  );

  if (!(await validatePassword(password, hashPassword))) {
    ctx.status = 401;
    ctx.body = { message: "email or password is not valid" };
    return;
  }

  if (role === ROLE.broker && !approvedByAdmin) {
    ctx.status = 403;
    ctx.body = { message: "pending admin approval" };
    return;
  }

  return next();
};

const isAdmin = async (ctx, next) => {
  const { userId } = ctx.request.user;
  const user = await getUser(
    { userId },
    { projection: { _id: 0, email: 1, role: 1 } }
  );
  if (user.role !== ROLE.admin) {
    ctx.status = 401;
    ctx.body = { message: "you are not admin" };
    return;
  }
  return next();
};

module.exports = { isAuthenticated, isValidCredentials, isAdmin };
