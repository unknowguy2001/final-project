const { prisma } = require("../../../utils/prisma");

const createReview = async (req, res) => {
  const parsedCompanyId = req.parsedCompanyId;
  const { rating, description = "", hashtags = [] } = req.body;

  // Check if rating is provided
  if (!rating) {
    return res.status(400).json({
      message: "กรุณาให้คะแนน",
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

  await prisma.reviewHashtag.createMany({
    data: hashtags.map((hashtag) => ({
      hashtagId: hashtag,
      reviewId: createdReview.id,
    })),
  });

  // Check if review is created
  if (!createdReview) {
    return res.status(400).json({
      message: "ไม่สามารถสร้างรีวิวได้",
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
    message: "สร้างรีวิวสำเร็จ",
  });
};

const deleteReview = async (req, res) => {
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
      message: "ไม่พบรีวิว",
    });
  }

  await prisma.reviewHashtag.deleteMany({
    where: {
      reviewId: parsedReviewId,
    },
  });

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
    message: "ลบรีวิวสำเร็จ",
  });
};

const updateReview = async (req, res) => {
  const parsedCompanyId = req.parsedCompanyId;
  const parsedReviewId = req.parsedReviewId;
  const { rating, description, hashtags = [] } = req.body;

  // Check if rating is provided
  if (!rating) {
    return res.status(400).json({
      message: "กรุณาให้คะแนน",
    });
  }

  const updatedReview = await prisma.review.update({
    where: { id: parsedReviewId, companyId: parsedCompanyId },
    data: { rating, review: description },
  });

  await prisma.reviewHashtag.deleteMany({
    where: {
      reviewId: parsedReviewId,
    },
  });

  await prisma.reviewHashtag.createMany({
    data: hashtags.map((hashtag) => ({
      reviewId: parsedReviewId,
      hashtagId: hashtag,
    })),
  });

  // Check if review is updated
  if (!updatedReview) {
    return res.status(400).json({
      message: "ไม่สามารถอัปเดตรีวิวได้",
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

  res.status(200).json({ message: "อัปเดตรีวิวสำเร็จ" });
};

const getReview = async (req, res) => {
  const parsedCompanyId = req.parsedCompanyId;
  const parsedReviewId = req.parsedReviewId;

  const review = await prisma.review.findUnique({
    where: { id: parsedReviewId, companyId: parsedCompanyId },
    include: {
      hashtags: true,
    },
  });

  if (!review) {
    return res.status(400).json({
      message: "ไม่พบรีวิว",
    });
  }

  review.hashtags = review.hashtags.map(
    (reviewHashtag) => reviewHashtag.hashtagId,
  );

  res.status(200).json({ item: review });
};

module.exports = {
  createReview,
  deleteReview,
  updateReview,
  getReview,
};
