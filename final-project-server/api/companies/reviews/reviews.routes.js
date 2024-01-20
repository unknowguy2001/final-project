const express = require("express");

const { requireReviewId } = require("../../../middleware/requireReviewId");
const { requireCompanyId } = require("../../../middleware/requireCompanyId");
const { checkNeverReview } = require("../../../middleware/checkNeverReview");
const { checkReviewAuthor } = require("../../../middleware/checkReviewAuthor");
const reviewsHandlers = require("./reviews.handlers");

const reviewsRoutes = express.Router();

reviewsRoutes.post(
  "/:companyId/reviews",
  requireCompanyId,
  checkNeverReview,
  reviewsHandlers.createReview
);

reviewsRoutes.get(
  "/:companyId/reviews/:reviewId",
  requireCompanyId,
  requireReviewId,
  checkReviewAuthor,
  reviewsHandlers.getReview
);
reviewsRoutes.patch(
  "/:companyId/reviews/:reviewId",
  requireCompanyId,
  requireReviewId,
  checkReviewAuthor,
  reviewsHandlers.updateReview
);
reviewsRoutes.delete(
  "/:companyId/reviews/:reviewId",
  requireCompanyId,
  requireReviewId,
  checkReviewAuthor,
  reviewsHandlers.deleteReview
);

module.exports = reviewsRoutes;
