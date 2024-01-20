const { prisma } = require("../utils/prisma");

module.exports.authorization = (roleId) => {
  return async (req, res, next) => {
    try {
      const user = await getUserByUsername(req.user.username);

      if (!user) {
        return res.status(401).json({ message: "Unauthorized!" });
      }

      if (user.roleId !== roleId) {
        return res.status(403).json({ message: "Forbidden!" });
      }

      next();
    } catch (error) {
      console.error("Authorization middleware error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

const getUserByUsername = async (username) => {
  return prisma.user.findUnique({
    where: {
      username: username,
    },
  });
};
