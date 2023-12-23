const { prisma } = require("../prisma");

module.exports.getRoles = async (req, res) => {
  const roles = await prisma.role.findMany();
  res.status(200).json({
    items: roles,
  });
};
