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

module.exports.hashtags = async (req, res) => {
  const hashtags = await prisma.hashtag.findMany();
  res.status(200).json({
    items: hashtags,
  });
};
