const { prisma } = require("../../utils/prisma");

const { DEFAULT_PER_PAGE } = require("../../constants/pagination");

module.exports.getTop4Popular = async (req, res) => {
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

module.exports.getCompanyById = async (req, res) => {
  const { id } = req.params;

  const companyId = Number(id);

  if (isNaN(companyId)) {
    return res.status(400).json({
      error: "id must be a number",
    });
  }

  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
    include: {
      reviews: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!company) {
    return res.status(404).json({
      item: null,
    });
  }

  let canReview = true;
  for (let i = 0; i < company.reviews.length; i++) {
    if (company.reviews[i].reviewerUsername === req.user.username) {
      canReview = false;
      break;
    }
  }

  res.status(200).json({
    item: company,
    canReview,
  });
};

module.exports.addCompany = async (req, res) => {
  const {
    name,
    address,
    road,
    village,
    district,
    province,
    zipcode,
    telephone,
  } = req.body;
  const isNotValid =
    !name ||
    !address ||
    !road ||
    !village ||
    !district ||
    !province ||
    !zipcode ||
    !telephone;

  //check data is not empty
  if (isNotValid) {
    return res.status(400).json({ message: "Please fill empty value" });
  }

  const newCompany = {
    name,
    address,
    road,
    village,
    district,
    province,
    zipcode,
    telephone,
  };

  const result = await prisma.company.create({
    data: {
      name: newCompany.name,
      address: newCompany.address,
      road: newCompany.road,
      village: newCompany.village,
      district: newCompany.district,
      province: newCompany.province,
      zipcode: newCompany.zipcode,
      telephone: newCompany.telephone,
    },
  });

  if (!result) {
    return res.status(409).json({ message: "Can't add company" });
  }

  return res.status(201).json({ message: "Added company!" });
};

module.exports.searchCompanies = async (req, res) => {
  const searchQuery = req.query.searchQuery || "";
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const perPage = Math.max(
    parseInt(req.query.perPage) || DEFAULT_PER_PAGE,
    DEFAULT_PER_PAGE
  );
  const options = {
    take: perPage,
    skip: (page - 1) * perPage,
  };
  const countOptions = {};

  if (searchQuery) {
    const columns = [
      "name",
      "address",
      "road",
      "village",
      "district",
      "province",
      "zipcode",
    ];
    options.where = {
      OR: columns.map((column) => ({
        [column]: {
          contains: searchQuery,
          mode: "insensitive",
        },
      })),
    };
    countOptions.where = options.where;
  }

  const [companies, count] = await Promise.all([
    prisma.company.findMany(options),
    prisma.company.count(countOptions),
  ]);

  res.status(200).json({ items: companies, count });
};

module.exports.updateCompany = async (req, res) => {
  const {
    name,
    address,
    road,
    village,
    district,
    province,
    zipcode,
    telephone,
  } = req.body;
  const isNotValid =
    !name ||
    !address ||
    !road ||
    !village ||
    !district ||
    !province ||
    !zipcode ||
    !telephone;

  if (!req.params.id || isNotValid) {
    return res.status(400).json({ message: "ID or fields is empty!" });
  }

  const updatedCompany = {
    name,
    address,
    road,
    village,
    district,
    province,
    zipcode,
    telephone,
  };

  const result = await prisma.company.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      name: updatedCompany.name,
      address: updatedCompany.address,
      road: updatedCompany.road,
      village: updatedCompany.village,
      district: updatedCompany.district,
      province: updatedCompany.province,
      zipcode: updatedCompany.zipcode,
      telephone: updatedCompany.telephone,
    },
  });

  if (!result) {
    return res.status(400).json({ message: "Can't update!" });
  }

  res.status(200).json({ message: "Updated compnay!" });
};

module.exports.deleteCompany = async (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).json({ message: "ID is empty or incorrect ID!" });
  }

  const result = await prisma.company.delete({
    where: { id: Number(req.params.id) },
  });

  if (!result) {
    return res.status(400).json({ message: "Can't delete company!" });
  }

  res.status(200).json({ message: "Deleted company!" });
};
