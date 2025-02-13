const { v4: uuidV4 } = require("uuid");
const { saveUser, getUser } = require("../db/user");
const { hashPassword } = require("../utils/password");
const { ROLE } = require("../constants/constant");
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
  await saveUser(user);

  if (role === ROLE.broker) {
    await sendAdminApprovalRequest(email, name, user.userId);
    ctx.body = { message: "sent for admin approval" };
    return;
  }

  const token = generateJwtToken(
    {
      userId: user.userId,
      email: user.email,
    },
    PRIVATE_KEY
  );

  ctx.set("Authorization", `Bearer ${token}`);
  ctx.body = { message: "register successfully" };
};

const login = async (ctx) => {
  const { email } = ctx.request.body;
  const user = await getUser(
    { email },
    { projection: { _id: 0, userId: 1, email: 1, role: 1, approvedByAdmin: 1 } }
  );

  const token = generateJwtToken(
    {
      userId: user.userId,
      email: user.email,
    },
    PRIVATE_KEY
  );

  ctx.status = 201;
  ctx.set("Authorization", `Bearer ${token}`);
  ctx.body = { message: "login successfully" };
};

module.exports = { register, login };
