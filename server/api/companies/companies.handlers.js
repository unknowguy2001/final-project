const { prisma } = require("../../utils/prisma");
const { connectRedis } = require("../../utils/redis");

const { DEFAULT_PER_PAGE } = require("../../constants/pagination");

const getTopPopular = async (req, res) => {
  const redis = await connectRedis();
  const cacheKey = "top-popular-companies";
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    redis.disconnect();
    return res.status(200).json({
      items: JSON.parse(cachedData),
    });
  }

  const popularCompanies = await prisma.company.findMany({
    take: 6,
    orderBy: {
      averageRating: "desc",
    },
  });
  const popularCompaniesWithReviewCount = await Promise.all(
    popularCompanies.map(async (company) => {
      const reviewCount = await prisma.review.count({
        where: {
          companyId: company.id,
        },
      });
      return {
        ...company,
        reviewCount,
      };
    })
  );

  await redis.set(cacheKey, JSON.stringify(popularCompaniesWithReviewCount));
  redis.disconnect();

  res.status(200).json({
    items: popularCompaniesWithReviewCount,
  });
};

const getCompanyById = async (req, res) => {
  const { id } = req.params;

  const companyId = Number(id);

  if (isNaN(companyId)) {
    return res.status(400).json({
      message: "Id ควรเป็นตัวเลข",
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
        include: {
          hashtags: {
            select: {
              hashtag: true,
            },
          },
        },
      },
    },
  });

  if (!company) {
    return res.status(404).json({
      item: null,
    });
  }

  company.ratingSummary = {
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0,
  };

  const hashtags = await prisma.hashtag.findMany({});

  company.hashtagSummary = [];

  for (let i = 0; i < hashtags.length; i++) {
    company.hashtagSummary.push({
      ...hashtags[i],
      count: 0,
    });
  }

  company.reviews.forEach((review) => {
    review.hashtags.forEach(({ hashtag }) => {
      const index = company.hashtagSummary.findIndex(
        (item) => item.id === hashtag.id
      );
      if (index !== -1) {
        company.hashtagSummary[index].count += 1;
      }
    });
  });

  const numberMap = {
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
  };

  company.reviews = company.reviews.map((review) => {
    company.ratingSummary[`${numberMap[review.rating]}Star`] += 1;
    return {
      ...review,
      hashtags: review.hashtags.map(({ hashtag }) => hashtag),
    };
  });

  const totalStar = Object.values(company.ratingSummary).reduce(
    (acc, cur) => acc + cur,
    0
  );

  company.ratingSummary = Object.entries(company.ratingSummary).reduce(
    (acc, [key, value]) => {
      const percentage = (value / totalStar) * 100;
      return {
        ...acc,
        [key]: {
          count: value,
          percentage: isNaN(percentage) ? 0 : percentage,
        },
      };
    },
    {}
  );

  // Check if the user can review the company
  const reviewByReviewer = await prisma.review.findFirst({
    where: { reviewerUsername: req.user.username },
  });
  const user = await prisma.user.findUnique({
    where: { username: req.user.username },
  });

  const EXPERIENCE_ROLE_ID = 1;

  const canReview =
    user.trainedCompanyId === company.id &&
    !reviewByReviewer &&
    user.roleId === EXPERIENCE_ROLE_ID;

  res.status(200).json({
    item: company,
    canReview,
  });
};

const createCompany = async (req, res) => {
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
  const isNotValid = !name;

  //check data is not empty
  if (isNotValid) {
    return res.status(400).json({ message: "กรุณากรอกชื่อบริษัท" });
  }

  const latestCompany = await prisma.company.findFirst({
    orderBy: {
      id: "desc",
    },
  });

  const newCompany = {
    id: latestCompany.id + 1,
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
      id: newCompany.id,
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
    return res.status(409).json({ message: "เกิดข้อผิดพลาด" });
  }

  return res.status(201).json({ message: "เพิ่มข้อมูลสำเร็จ" });
};

const searchCompanies = async (req, res) => {
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

  const companiesWithReviewCount = await Promise.all(
    companies.map(async (company) => {
      const reviewCount = await prisma.review.count({
        where: {
          companyId: company.id,
        },
      });
      return {
        ...company,
        reviewCount,
      };
    })
  );

  res.status(200).json({ items: companiesWithReviewCount, count });
};

const updateCompany = async (req, res) => {
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
  const isNotValid = !name;

  if (!req.params.id || isNotValid) {
    return res.status(400).json({ message: "กรุณากรอกชื่อบริษัท" });
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
    return res.status(400).json({ message: "ไม่สามารถแก้ไขข้อมูลได้" });
  }

  res.status(200).json({ message: "แก้ไขข้อมูลสำเร็จ" });
};

const deleteCompany = async (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).json({ message: "Id ไม่ถูกต้อง" });
  }

  const result = await prisma.company.delete({
    where: { id: Number(req.params.id) },
  });

  if (!result) {
    return res.status(400).json({ message: "ไม่สามารถลบข้อมูลได้" });
  }

  res.status(200).json({ message: "ลบข้อมูลสำเร็จ" });
};

module.exports = {
  getTopPopular,
  getCompanyById,
  createCompany,
  searchCompanies,
  updateCompany,
  deleteCompany,
};
