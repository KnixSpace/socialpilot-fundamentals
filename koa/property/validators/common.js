const isDefined = (value) => value !== undefined;

const isValidType = (value, type) => typeof value === type;

const isInRange = (value, rangeType, min = null, max = null) => {
  const length = value.trim().length;
  if (rangeType === "BOTH") {
    if (length < min && length > max) {
      return false;
    }
    return true;
  } else if (rangeType === "MIN") {
    if (length < min) {
      return false;
    }
    return true;
  } else if (rangeType === "MAX") {
    if (length > max) {
      return false;
    }
    return true;
  }
};

const isValidEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());

const isValidPassword = (password) =>
  password.trim().length > 8 &&
  password.trim().length < 16 &&
  /[A-Z]/.test(password) &&
  /[0-9]/.test(password);

module.exports = {
  isDefined,
  isValidType,
  isInRange,
  isValidEmail,
  isValidPassword,
};
