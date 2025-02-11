const bcrypt = require("bcrypt");

const generateHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const verifyHashPassword = async (password, hashPassword) =>
  await bcrypt.compare(password, hashPassword);

module.exports = { generateHashPassword, verifyHashPassword };
