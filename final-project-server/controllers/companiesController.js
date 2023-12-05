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

const addCompany = async (req, res) => {
  const {
    name,
    typeId,
    workModelId,
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
    !typeId ||
    !workModelId ||
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
    typeId,
    workModelId,
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
      typeId: newCompany.typeId,
      workModelId: newCompany.workModelId,
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

const getAllCompany = async (req, res) => {
  const PER_PAGE = 12;
  const searchTerm = req.query.search || "";
  const page = Math.max(parseInt(req.query.page) || 1, 1);

  const options = {
    take: PER_PAGE,
    skip: (page - 1) * PER_PAGE,
  };
  const countOptions = {};

  if (searchTerm) {
    options.where = {
      OR: [
        {
          name: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          address: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          road: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          village: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          district: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          province: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          zipcode: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    };
    countOptions.where = options.where;
  }

  const [companies, count] = await Promise.all([
    prisma.company.findMany(options),
    prisma.company.count(countOptions),
  ]);

  res.status(200).json({ items: companies, count });
};

const updateCompany = async (req, res) => {
  const {
    name,
    typeId,
    workModelId,
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
    !typeId ||
    !workModelId ||
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
    typeId,
    workModelId,
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
      typeId: updatedCompany.typeId,
      workModelId: updatedCompany.workModelId,
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

const deleteCompany = async (req, res) => {
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

module.exports = {
  getTop4Popular,
  getCompanyById,
  addCompany,
  getAllCompany,
  updateCompany,
  deleteCompany,
};