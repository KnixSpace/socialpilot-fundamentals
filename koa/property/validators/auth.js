const { isUser } = require("../db/user");
const {
  isDefined,
  isValidEmail,
  isValidPassword,
  isValidType,
  isInRange,
} = require("./common");
const { buildPropertyError } = require("./validate");

const validateRegisterName = (ctx, errors) => {
  const { name } = ctx.request.body;

  if (!isDefined(name))
    return errors.push(buildPropertyError("name", "name is required"));
  else if (!isValidType(name, "string"))
    return errors.push(
      buildPropertyError("name", "name must be a valid string")
    );
  else if (!isInRange(name, "BOTH", 1, 25))
    return errors.push(
      buildPropertyError(
        "name",
        "name must be of minimum 1 and maximum 25 character"
      )
    );
};

const validateRegisterEmail = async (ctx, errors) => {
  const { email } = ctx.request.body;

  if (!isDefined(email))
    return errors.push(buildPropertyError("email", "email is required"));
  else if (!isValidType(email, "string"))
    return errors.push(
      buildPropertyError("email", "email must be valid string")
    );
  else if (!isValidEmail(email))
    return errors.push(buildPropertyError("email", "not a valid email"));
  else if (await isUser({ email }))
    return errors.push(buildPropertyError("email", "email already existes"));
};

const validateRegisterPassword = (ctx, errors) => {
  const { password } = ctx.request.body;

  if (!isDefined(password))
    return errors.push(buildPropertyError("password", "password is required"));
  else if (!isValidType(password, "string"))
    return errors.push(
      buildPropertyError("password", "password must be valid string")
    );
  else if (!isValidPassword(password))
    return errors.push(buildPropertyError("password", "not a valid password"));
};

const validateLoginEmail = (ctx, errors) => {
  const { email } = ctx.request.body;

  if (!isDefined(email))
    return errors.push(buildPropertyError("email", "email is required"));
  else if (!isValidType(email, "string"))
    return errors.push(
      buildPropertyError("email", "email must be valid string")
    );
  else if (!isValidEmail(email))
    return errors.push(buildPropertyError("email", "email is not valid"));
};

const validateLoginPassword = (ctx, errors) => {
  const { password } = ctx.request.body;

  if (!isDefined(password))
    return errors.push(buildPropertyError("password", "password is required"));
  else if (!isValidType(password, "string"))
    return errors.push(
      buildPropertyError("password", "password must be valid string")
    );
};

module.exports = {
  validateRegisterName,
  validateRegisterEmail,
  validateRegisterPassword,
  validateLoginEmail,
  validateLoginPassword,
};
1;
