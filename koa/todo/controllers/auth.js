const { v4: uuidV4 } = require("uuid");
const { saveUser, getUser } = require("../db/user");
const { generateHashPassword } = require("../utils/password");
const { generateJwtToken } = require("../utils/jwt");

const registerUser = async (ctx) => {
  const { name, email, password } = ctx.request.body;
  const userId = uuidV4();
  await saveUser({
    userId,
    name,
    email,
    password: await generateHashPassword(password),
  });

  const token = generateJwtToken({ userId });

  ctx.set("Authorization", `Bearer ${token}`);
  ctx.body = { message: "registered successfully" };
};

const loginUser = async (ctx) => {
  const { email } = ctx.request.body;

  const user = await getUser({ email }, { projection: { _id: 0, userId: 1 } });

  const token = generateJwtToken({ userId: user.userId });

  ctx.status = 201;
  ctx.set("Authorization", `Bearer ${token}`);
  ctx.body = { message: "login successfully" };
};

module.exports = { registerUser, loginUser };
