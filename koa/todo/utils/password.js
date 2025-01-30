const bcrypt = require("bcrypt");

const generateHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const verifyHashPassword = async (password, hashPassword) => {
  const check = await bcrypt.compare(password, hashPassword);
  if (check) {
    return true;
  }
  return false;
};

module.exports = { generateHashPassword, verifyHashPassword };
