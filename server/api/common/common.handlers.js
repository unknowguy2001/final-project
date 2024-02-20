const { prisma } = require("../../utils/prisma");
const { connectRedis } = require("../../utils/redis");

const roles = async (req, res) => {
  const roles = await prisma.role.findMany({
    orderBy: {
      sequence: "asc",
    },
  });
  res.status(200).json({
    items: roles,
  });
};

const hashtags = async (req, res) => {
  const hashtags = await prisma.hashtag.findMany();
  res.status(200).json({
    items: hashtags,
  });
};

const provinces = async (req, res) => {
  const redis = await connectRedis();
  const cacheKey = "provinces";
  const cacheData = await redis.get(cacheKey);

  if (cacheData) {
    return res.status(200).json({
      items: JSON.parse(cacheData),
    });
  }

  const companies = await prisma.company.findMany({
    select: {
      province: true,
    },
  });

  const itemMap = new Map();
  const items = [];
  for (const company of companies) {
    if (items.length > 10) break;
    const trimmedCompanyProvince = company.province.trim();
    if (!trimmedCompanyProvince) continue;
    if (itemMap.has(trimmedCompanyProvince)) continue;
    itemMap.set(trimmedCompanyProvince, true);
    items.push(trimmedCompanyProvince);
  }
  await redis.set(cacheKey, JSON.stringify(items));
  redis.disconnect();

  res.status(200).json({
    items,
  });
};

const getGoogleFormUrl = async (req, res) => {
  const urls = {
    1: "https://forms.gle/PKyTAbL6zxx2jiPs5", // ผู้ใช้งานที่มีประสบการณ์
    2: "https://forms.gle/tLKZDn6MuTzm9baCA", // ผู้ดูแลระบบ
    3: "https://forms.gle/ebWEoJfpLb4gyx6f8", // ผู้ใช้งานที่ไม่มีประสบการณ์
  };
  const user = await prisma.user.findFirst({
    where: {
      username: req.user.username,
    },
    select: {
      roleId: true,
    },
  });
  const url = urls[user.roleId];
  res.status(200).json({
    url,
  });
};

const companyNames = async (req, res) => {
  const companies = await prisma.company.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  res.status(200).json({
    items: companies,
  });
};

module.exports = {
  roles,
  hashtags,
  provinces,
  getGoogleFormUrl,
  companyNames,
};
