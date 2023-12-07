const { prisma } = require("../prisma");

const createReview = async (req, res) => {
  const { rating, description } = req.body;

  const parsedCompanyId = req.parsedCompanyId;

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
  const parsedCompanyId = req.parsedCompanyId;
  const parsedReviewId = req.parsedReviewId;

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

  const parsedCompanyId = req.parsedCompanyId;
  const parsedReviewId = req.parsedReviewId;

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
  const parsedReviewId = req.parsedReviewId;

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
