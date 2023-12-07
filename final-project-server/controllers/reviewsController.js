const { prisma } = require("../prisma");

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

  let canReview = true;
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
      canReview = false;
      break;
    }
  }

  if (!canReview) {
    return res.status(403).json({
      message: "Forbidden",
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

  // Check if reviewId is a number
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
};

const updateReview = async (req, res) => {
  const { rating, description } = req.body;
  const { companyId, reviewId } = req.params;

  const parsedCompanyId = parseInt(companyId);
  const parsedReviewId = parseInt(reviewId);

  // Check if companyId is a number
  if (isNaN(parsedCompanyId)) {
    return res.status(400).json({
      message: "companyId must be a number",
    });
  }

  // Check if reviewId is a number
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

  const updatedReview = await prisma.review.update({
    where: { id: parsedReviewId },
    data: { rating, review: description },
  });

  if (!updatedReview) {
    return res.status(400).json({
      message: "Can't update review",
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

  res.status(200).json({ message: "Updated review!" });
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
  createReview,
  deleteReview,
  updateReview,
  getReview,
};
