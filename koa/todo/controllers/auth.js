const { v4: uuidV4 } = require("uuid");
const { saveUser, getUser } = require("../db/user");
const {
  generateHashPassword,
  verifyHashPassword,
} = require("../utils/password");
const { generateJwtToken } = require("../utils/jwt");

const registerUser = async (ctx) => {
  try {
    const { name, email, password } = ctx.request.body;
    const userId = uuidV4();
    const hashPassword = await generateHashPassword(password);
    await saveUser({ userId, name, email, password: hashPassword });
    const token = generateJwtToken({ userId });
    ctx.status = 201;
    ctx.body = { token };
  } catch (error) {
    ctx.response.status = 500;
    ctx.body = { message: "Error in registering user" };
  }
};

const loginUser = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;
    const user = await getUser(email);
    if (!user || !password) {
      ctx.response.status = 400;
      ctx.body = { message: "email or password are incorrect" };
      return;
    }
    const check = await verifyHashPassword(password, user.password);
    if (!check) {
      ctx.response.status = 400;
      ctx.body = { message: "email or password are incorrect" };
      return;
    }

    ctx.response.status = 201;
    ctx.body = { token: generateJwtToken({ userId: user.userId }) };
  } catch (error) {
    console.log(error);
    ctx.response.status = 401;
    ctx.body = { message: "Unautorized" };
    console.error("Error in login", error);
  }
};

module.exports = { registerUser, loginUser };
