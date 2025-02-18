const { v4: uuidV4 } = require("uuid");
const { createUser, readUser } = require("../db/user");
const { hashPassword } = require("../utils/password");
const { userRole } = require("../constants/constant");
const { generateJwtToken } = require("../utils/jwt");
const { sendAdminApprovalRequest } = require("../utils/email");

const PRIVATE_KEY = process.env.JWT_PASSWORD_KEY;

const register = async (ctx) => {
  const { role, name, email, password } = ctx.request.body;
  const user = {
    userId: uuidV4(),
    approvedByAdmin: false,
    ratings: 0,
    role,
    name,
    email,
    password: await hashPassword(password),
    createdOn: new Date(),
    updatedOn: new Date(),
  };
  await createUser(user);

  if (role === userRole.broker) {
    await sendAdminApprovalRequest(email, name, user.userId);
    ctx.body = { message: "sent for admin approval" };
    return;
  }

  const token = generateJwtToken(
    {
      userId: user.userId,
      role: user.role,
      email: user.email,
    },
    PRIVATE_KEY
  );

  ctx.set("Authorization", `Bearer ${token}`);
  ctx.body = { message: "register successfully" };
};

const login = async (ctx) => {
  const user = ctx.request.user;
  const token = generateJwtToken(
    {
      userId: user.userId,
      role: user.role,
      email: user.email,
    },
    PRIVATE_KEY
  );

  ctx.status = 201;
  ctx.set("Authorization", `Bearer ${token}`);
  ctx.body = { message: "login successfully" };
};

module.exports = { register, login };
