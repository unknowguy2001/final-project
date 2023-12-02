const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getTop4Popular = async (req, res) => {
  const popularCompanies = await prisma.company.findMany({
    take: 4,
    orderBy: {
      averageRating: "desc",
    },
  });
  res.status(200).json({
    items: popularCompanies,
  });
};

const getCompanyById = async (req, res) => {
  const { id } = req.params;
  const company = await prisma.company.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json({
    item: company,
  });
};

module.exports = {
  getTop4Popular,
  getCompanyById,
};
