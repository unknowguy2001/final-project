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
  const companys = await prisma.company.findMany();

  if (!companys) {
    return res.status(404).json({ message: "NOT FOUND!" });
  }

  res.status(200).json({ data: companys });
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

const deleteCompany = (req, res) => {};

module.exports = {
  getTop4Popular,
  getCompanyById,
  addCompany,
  getAllCompany,
  updateCompany,
};
