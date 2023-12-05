const jwt = require("jsonwebtoken");

const verifyToken = (token, tokenType) => {
  const secret =
    tokenType === "access"
      ? process.env.JWT_ACCESS_TOKEN_SECRET
      : process.env.JWT_REFRESH_TOKEN_SECRET;
  const payload = jwt.verify(token, secret);
  return payload;
};

const generateToken = (payload, tokenType) => {
  const secret =
    tokenType === "access"
      ? process.env.JWT_ACCESS_TOKEN_SECRET
      : process.env.JWT_REFRESH_TOKEN_SECRET;
  const token = jwt.sign(payload, secret, {
    expiresIn: tokenType === "access" ? "15m" : "1d",
  });
  return token;
};

module.exports = {
  verifyToken,
  generateToken,
};