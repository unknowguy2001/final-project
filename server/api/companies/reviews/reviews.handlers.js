const { prisma } = require("../../../utils/prisma");
const { connect } = require("../companies.routes");

module.exports.createReview = async (req, res) => {
  const parsedCompanyId = req.parsedCompanyId;
  const { rating, description, hashtags } = req.body;

  // Check if rating is provided
  if (!rating) {
    return res.status(400).json({
      message: "rating is required",
    });
  }
  console.log(hashtags);

  const createdReview = await prisma.review.create({
    data: {
      rating,
      review: description,
      reviewer: req.user.fullname,
      reviewerUsername: req.user.username,
      companyId: parsedCompanyId,
      hashtags: { connect: hashtags.map((hashtagId) => ({ id: hashtagId })) },
    },
  });
  console.log(createdReview);
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

module.exports.deleteReview = async (req, res) => {
  const parsedCompanyId = req.parsedCompanyId;
  const parsedReviewId = req.parsedReviewId;

  const review = await prisma.review.findUnique({
    where: {
      id: parsedReviewId,
      companyId: parsedCompanyId,
    },
  });

  // Check if review exists
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

module.exports.updateReview = async (req, res) => {
  const parsedCompanyId = req.parsedCompanyId;
  const parsedReviewId = req.parsedReviewId;
  const { rating, description } = req.body;

  const updatedReview = await prisma.review.update({
    where: { id: parsedReviewId, companyId: parsedCompanyId },
    data: { rating, review: description },
  });

  // Check if review is updated
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

module.exports.getReview = async (req, res) => {
  const parsedCompanyId = req.parsedCompanyId;
  const parsedReviewId = req.parsedReviewId;

  const review = await prisma.review.findUnique({
    where: { id: parsedReviewId, companyId: parsedCompanyId },
    include: { hashtags: true },
  });

  if (!review) {
    return res.status(400).json({
      message: "Can't get this review",
    });
  }

  res.status(200).json({ item: review });
};
