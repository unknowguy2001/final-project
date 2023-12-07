const requireReviewId = async (req, res, next) => {
  const { reviewId } = req.params;

  const parsedReviewId = parseInt(reviewId);

  if (isNaN(parsedReviewId)) {
    return res.status(400).json({
      message: "reviewId must be a number",
    });
  }

  req.parsedReviewId = parsedReviewId;

  next();
};

module.exports = { requireReviewId };
