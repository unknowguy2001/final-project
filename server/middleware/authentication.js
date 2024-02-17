const { verifyToken } = require("../utils/token");

const authentication = (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  const payload = verifyToken(accessToken, "access");

  if (!payload) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  req.user = payload;

  next();
};

module.exports = {
  authentication,
};
