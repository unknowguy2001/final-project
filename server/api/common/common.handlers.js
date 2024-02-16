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

module.exports.getGoogleFormUrl = async (req, res) => {
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
