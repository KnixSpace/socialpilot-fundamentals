const jwt = require("jsonwebtoken");

const generateJwtToken = (data, privateKey) => jwt.sign(data, privateKey);

const verifyJwtToken = (token, privateKey) =>
  jwt.verify(token, privateKey, (err, decode) => {
    if (!err) return decode;
  });

module.exports = { generateJwtToken, verifyJwtToken };
