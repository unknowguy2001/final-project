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

module.exports.provinces = async (req, res) => {
  const companies = await prisma.company.findMany({
    select: {
      province: true,
    },
  });

  res.status(200).json({
    items: Array.from(
      new Set(
        companies.map((company) => company.province.trim()).filter(Boolean)
      )
    ).slice(0, 10),
  });
};
