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

  if (isNaN(Number(id))) {
    return res.status(400).json({
      error: "id must be a number",
    });
  }

  const company = await prisma.company.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!company) {
    return res.status(404).json({
      item: null,
    });
  }

  res.status(200).json({
    item: company,
  });
};

module.exports = {
  getTop4Popular,
  getCompanyById,
};
