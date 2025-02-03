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

const email = (ctx, errors) => {
  const { email } = ctx.request.body;
  if (ctx.originalUrl.split("/").includes("login")) {
    if (!isEmail(email)) {
      return errors.push(buildPropertyError("email", "Not an valid email"));
    }
  } else if (ctx.originalUrl.split("/").includes("register")) {
    //process async task
  }
};

const password = (ctx, errors) => {
  const { password } = ctx.request.body;
  isPassword(password, "password", errors);
};

module.exports = { name, email, password };
