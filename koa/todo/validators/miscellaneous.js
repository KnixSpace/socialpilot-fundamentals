const { buildPropertyError } = require("./validator");

const isEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (typeof email === "string" && emailRegex.test(email.trim())) {
    return true;
  }
  return false;
};

const isPassword = (password, property, errors) => {
  if (!isValidType(password, "string")) {
    errors.push(buildPropertyError(property, "Must be an valid password"));
    return;
  } else if (password.trim().length < 8 || password.trim().length > 16) {
    errors.push(
      buildPropertyError(property, "Must be of 8 to 16 character long")
    );
    return;
  }
};

const isValidType = (data, type) => {
  if (typeof data === type) {
    return true;
  }
  return false;
};

const isDefined = (data) => {
  if (data !== undefined) {
    return true;
  }
  return false;
};

const isMin = (data, min) => {
  if (data?.trim().length >= min) {
    return true;
  }
  return false;
};

const isMax = (data, max) => {
  if (data?.trim().length <= max) {
    return true;
  }
  return false;
};

module.exports = {
  buildPropertyError,
  isEmail,
  isPassword,
  isValidType,
  isDefined,
  isMin,
  isMax,
};
