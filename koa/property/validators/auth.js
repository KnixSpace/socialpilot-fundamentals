const { isUser, getUser } = require("../db/user");
const { validatePassword } = require("../utils/password");
const {
  isDefined,
  isValidEmail,
  isValidPassword,
  isValidType,
  isInRange,
} = require("./common");
const { buildPropertyError } = require("./validate");

const name = (ctx, errors) => {
  const { name } = ctx.request.body;

  if (!isDefined(name)) {
    errors.push(buildPropertyError("name", "name is required"));
    return;
  } else if (!isValidType(name, "string")) {
    errors.push(buildPropertyError("name", "not a valid string"));
    return;
  } else if (!isInRange(name, "BOTH", 1, 25)) {
    errors.push(
      buildPropertyError(
        "name",
        "name must be of minimum 1 and maximum 25 character"
      )
    );
    return;
  }
};

const email = async (ctx, errors) => {
  const { email } = ctx.request.body;
  const url = ctx.url;

  if (!isDefined(email)) {
    errors.push(buildPropertyError("email", "email is required"));
    return;
  } else if (!isValidEmail(email)) {
    errors.push(buildPropertyError("email", "not a valid email"));
    return;
  }

  if (url === "/api/v1/auth/register") {
    if (await isUser({ email })) {
      errors.push(buildPropertyError("email", "email already existes"));
      return;
    }
  }
};

const isValidCredential = async (email, password) => {
  if (!isDefined(email)) {
    return false;
  }

  if (!(await isUser({ email }))) {
    return false;
  }

  const { password: hashPassword } = await getUser(
    { email },
    { projection: { _id: 0, password: 1 } }
  );
  if (!(await validatePassword(password, hashPassword))) {
    return false;
  }

  return true;
};

const password = async (ctx, errors) => {
  const { email, password } = ctx.request.body;
  const url = ctx.url;

  if (!isDefined(password)) {
    errors.push(buildPropertyError("password", "password is required"));
    return;
  } else if (url === "/api/v1/auth/register") {
    if (!isValidPassword(password)) {
      errors.push(buildPropertyError("password", "not a valid password"));
      return;
    }
  } else if (url === "/api/v1/auth/login") {
    if (!(await isValidCredential(email, password))) {
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
1;
