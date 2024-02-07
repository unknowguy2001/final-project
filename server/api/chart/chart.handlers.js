const { prisma } = require("../../utils/prisma");

module.exports.hashtags = async (req, res) => {
  const hashtags = await prisma.hashtag.findMany({});
  const data = [];
  const colors = ["#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6"];
  for (let i = 0; i < hashtags.length; i++) {
    data.push({
      id: hashtags[i].name,
      label: hashtags[i].name,
      value: await prisma.reviewHashtag.count({
        where: {
          hashtagId: hashtags[i].id,
        },
      }),
      color: colors[i],
    });
  }
  res.json(data);
};

module.exports.roles = async (req, res) => {
  const roles = await prisma.role.findMany({
    orderBy: {
      sequence: "asc",
    },
  });
  const data = [];
  const colors = ["#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6"];
  for (let i = 0; i < roles.length; i++) {
    data.push({
      id: roles[i].name,
      label: roles[i].name,
      value: await prisma.user.count({
        where: {
          roleId: roles[i].id,
        },
      }),
      color: colors[i],
    });
  }
  res.json(data);
};
