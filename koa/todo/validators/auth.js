const { isUser, getUser } = require("../db/user");
const { verifyHashPassword } = require("../utils/password");
const {
  isValidType,
  isDefined,
  isMin,
  isMax,
  isEmail,
  isPassword,
} = require("./miscellaneous");
const { buildPropertyError } = require("./validator");

const name = (ctx, errors) => {
  const { name } = ctx.request.body;
  if (!isDefined(name)) {
    return errors.push(buildPropertyError("name", "Name is required"));
  } else if (!isValidType(name, "string")) {
    return errors.push(buildPropertyError("name", "Name must be string"));
  } else if (!isMin(name, 1)) {
    return errors.push(
      buildPropertyError("name", "Name must be of minimum 1 character")
    );
  } else if (!isMax(name, 20)) {
    return errors.push(
      buildPropertyError("name", "Name must be of maximum 20 characters")
    );
  }
};

const email = async (ctx, errors) => {
  const { email } = ctx.request.body;
  if (!isDefined(email))
    return errors.push(buildPropertyError("email", "email is required"));

  if (!isEmail(email))
    return errors.push(buildPropertyError("email", "Not an valid email"));

  if (ctx.originalUrl.split("/").includes("register")) {
    if (await isUser({ email }))
      return errors.push(buildPropertyError("email", "email already exists"));
  }
};

const isValidUser = async (email, password) => {
  if (!isDefined(email)) return false;

  if (!(await isUser({ email }))) return false;

  const { password: hashPassword } = await getUser(
    { email },
    { projection: { _id: 0, password: 1 } }
  );

  if (!(await verifyHashPassword(password, hashPassword))) return false;

  return true;
};

const password = async (ctx, errors) => {
  const { email, password } = ctx.request.body;

  if (!isDefined(password)) {
    errors.push(buildPropertyError("password", "password is required"));
    return;
  } else if (ctx.originalUrl.split("/").includes("register")) {
    if (!isPassword(password)) {
      errors.push(buildPropertyError("password", "not a valid password"));
      return;
    }
  } else if (ctx.originalUrl.split("/").includes("login")) {
    if (!(await isValidUser(email, password))) {
      errors.push(
        buildPropertyError(
          "invalid credentials",
          "password or email is not valid"
        )
      );
      return;
    }
  }
};

module.exports = { name, email, password };
