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

const searchCompanies = async (req, res) => {
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

const createReview = async (req, res) => {
  const { rating, description } = req.body;
  const { companyId } = req.params;

  const parsedCompanyId = parseInt(companyId);

  // Check if companyId is a number
  if (isNaN(parsedCompanyId)) {
    return res.status(400).json({
      message: "companyId must be a number",
    });
  }

  // Check if rating is provided
  if (!rating) {
    return res.status(400).json({
      message: "rating is required",
    });
  }

  const createdReview = await prisma.review.create({
    data: {
      rating,
      review: description,
      reviewer: req.user.fullname,
      reviewerUsername: req.user.username,
      companyId: parsedCompanyId,
    },
  });

  // Check if review is created
  if (!createdReview) {
    return res.status(400).json({
      message: "Can't create review",
    });
  }

  // Calculate average rating
  const aggregations = await prisma.review.aggregate({
    _avg: {
      rating: true,
    },
    where: {
      companyId: parsedCompanyId,
    },
  });

  // Round average rating to 1 decimal place
  const averageRating = Math.round(aggregations._avg.rating * 10) / 10;

  // Update average rating
  await prisma.company.update({
    where: {
      id: parsedCompanyId,
    },
    data: {
      averageRating,
    },
  });

  res.status(201).json({
    message: "Created review",
  });
};

const deleteReview = async (req, res) => {
  const { companyId, reviewId } = req.params;

  const parsedCompanyId = parseInt(companyId);
  const parsedReviewId = parseInt(reviewId);

  // Check if companyId is a number
  if (isNaN(parsedCompanyId)) {
    return res.status(400).json({
      message: "companyId must be a number",
    });
  }
};

// Check if reviewId is a number
const updateReview = async (req, res) => {
  const { rating, description } = req.body;
  const { reviewId, companyId } = req.params;

  const parsedReviewId = parseInt(reviewId);
  const parsedCompanyId = parseInt(companyId);

  if (isNaN(parsedReviewId)) {
    return res.status(400).json({
      message: "reviewId must be a number",
    });
  }

  // Check if review exists
  const review = await prisma.review.findUnique({
    where: {
      id: parsedReviewId,
    },
  });
  if (!review) {
    return res.status(404).json({
      message: "Review not found",
    });
  }

  // Check if user is authorized to delete review
  if (review.reviewerUsername !== req.user.username) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  // Delete review
  await prisma.review.delete({
    where: {
      id: parsedReviewId,
    },
  });

  if (isNaN(parsedCompanyId)) {
    return res.status(400).json({
      message: "companyId must be a number",
    });
  }

  const updatedReview = await prisma.review.update({
    where: { id: parsedReviewId },
    data: { rating, review: description },
  });

  if (!updatedReview) {
    return res.status(400).json({
      message: "Can't edit review",
    });
  }

  // Calculate average rating
  const aggregations = await prisma.review.aggregate({
    _avg: {
      rating: true,
    },
    where: {
      companyId: parsedCompanyId,
    },
  });

  // Round average rating to 1 decimal place
  const averageRating = Math.round(aggregations._avg.rating * 10) / 10;

  // Update average rating
  await prisma.company.update({
    where: {
      id: parsedCompanyId,
    },
    data: {
      averageRating,
    },
  });

  // Send response
  res.status(200).json({
    message: "Deleted review",
  });
  res.status(200).json({ message: "Review has been updated!" });
};

const getReview = async (req, res) => {
  const { reviewId, companyId } = req.params;

  const parsedReviewId = Number(reviewId);
  const parsedCompanyId = Number(companyId);

  if (isNaN(parsedCompanyId)) {
    return res.status(400).json({
      message: "companyId must be a number",
    });
  }
  if (isNaN(parsedReviewId)) {
    return res.status(400).json({
      message: "reviewId must be a number",
    });
  }
  const review = await prisma.review.findUnique({
    where: { id: parsedReviewId },
  });

  if (!review) {
    return res.status(400).json({
      message: "Can't get this review",
    });
  }

  res.status(200).json({ item: review });
};

module.exports = {
  getTop4Popular,
  getCompanyById,
  addCompany,
  searchCompanies,
  updateCompany,
  deleteCompany,
  createReview,
  deleteReview,
  updateReview,
  getReview,
};
