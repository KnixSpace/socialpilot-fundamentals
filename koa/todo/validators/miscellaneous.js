const { buildPropertyError } = require("./validator");
const { validate: uuidValidate } = require("uuid");

const isEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());

const isPassword = (password) =>
  password.trim().length > 8 &&
  password.trim().length < 16 &&
  /[A-Z]/.test(password) &&
  /[0-9]/.test(password);

const isValidType = (data, type) => typeof data === type;

const isDefined = (data) => data !== undefined;

const isMin = (data, min) => data?.trim().length >= min;

const isMax = (data, max) => data?.trim().length <= max;

const isUuid = (param) => uuidValidate(param);

module.exports = {
  buildPropertyError,
  isEmail,
  isPassword,
  isValidType,
  isDefined,
  isMin,
  isMax,
  isUuid,
};
