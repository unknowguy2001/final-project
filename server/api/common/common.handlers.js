const { prisma } = require("../../utils/prisma");

module.exports.roles = async (req, res) => {
  const roles = await prisma.role.findMany({
    orderBy: {
      sequence: "asc",
    },
  });
  res.status(200).json({
    items: roles,
  });
};
