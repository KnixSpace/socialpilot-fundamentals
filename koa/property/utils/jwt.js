const jwt = require("jsonwebtoken");

const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

const generateJwtToken = (data) => jwt.sign(data, PRIVATE_KEY);

const verifyJwtToken = (token) =>
  jwt.verify(token, PRIVATE_KEY, (err, decode) => {
    if (!err) return decode;
  });

module.exports = { generateJwtToken, verifyJwtToken };
