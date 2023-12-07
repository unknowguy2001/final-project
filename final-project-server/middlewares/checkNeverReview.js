const { prisma } = require("../prisma");

const checkNeverReview = async (req, res, next) => {
  const { companyId } = req.params;

  const parsedCompanyId = parseInt(companyId);

  const company = await prisma.company.findUnique({
    where: {
      id: parsedCompanyId,
    },
    include: {
      reviews: true,
    },
  });

  for (let i = 0; i < company.reviews.length; i++) {
    if (company.reviews[i].reviewerUsername === req.user.username) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
  }

  next();
};

module.exports = {
  checkNeverReview,
};
