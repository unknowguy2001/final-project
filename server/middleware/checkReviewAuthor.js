const { prisma } = require("../utils/prisma");

const checkReviewAuthor = async (req, res, next) => {
  const { reviewId } = req.params;

  const parsedReviewId = parseInt(reviewId);

  // Check if reviewId is a number
  if (isNaN(parsedReviewId)) {
    return res.status(400).json({
      message: "reviewId must be a number",
    });
  }

  const review = await prisma.review.findUnique({
    where: {
      id: parsedReviewId,
    },
  });

  // Check if user is the author of the review
  if (review.reviewerUsername !== req.user.username) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  next();
};

module.exports = {
  checkReviewAuthor,
};
