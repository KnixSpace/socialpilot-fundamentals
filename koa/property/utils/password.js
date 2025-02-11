const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const validatePassword = async (password, hashPassword) =>
  await bcrypt.compare(password, hashPassword);

module.exports = { hashPassword, validatePassword };
