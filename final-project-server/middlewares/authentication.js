const { verifyToken } = require("../utils/token");

module.exports.authentication = (req, res, next) => {
  if (!req.signedCookies.accessToken) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  const payload = verifyToken(req.signedCookies.accessToken, "access");

  if (!payload) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  req.user = payload;

  next();
};
