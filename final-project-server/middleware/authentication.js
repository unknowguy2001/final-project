const { verifyToken } = require("../utils/token");

const authentication = (req, res, next) => {
  if (!req.signedCookies.accessToken) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
  const isAccessTokenValid = verifyToken(
    req.signedCookies.accessToken,
    "access"
  );

  if (!isAccessTokenValid) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  next();
};

module.exports = authentication;
