const jwt = require("jsonwebtoken");

const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

const generateJwtToken = (data) => {
  return jwt.sign(data, PRIVATE_KEY);
};

const verifyJwtToken = (token) => {
  return jwt.verify(token, PRIVATE_KEY);
};

module.exports = { generateJwtToken, verifyJwtToken };
