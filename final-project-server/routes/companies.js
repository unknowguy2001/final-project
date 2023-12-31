const express = require("express");

const {
  createReview,
  deleteReview,
  updateReview,
  getReview,
} = require("../controllers/reviewsController");
const {
  getTop4Popular,
  getCompanyById,
  addCompany,
  searchCompanies,
  updateCompany,
  deleteCompany,
} = require("../controllers/companiesController");
const { authorization } = require("../middlewares/authorization");
const { requireReviewId } = require("../middlewares/requireReviewId");
const { requireCompanyId } = require("../middlewares/requireCompanyId");
const { checkNeverReview } = require("../middlewares/checkNeverReview");
const { checkReviewAuthor } = require("../middlewares/checkReviewAuthor");

const router = express.Router();

router.get("/top-4-popular", getTop4Popular);
router.get("", searchCompanies);
router.get("/:id", getCompanyById);
router.post("", authorization(2), addCompany);
router.patch("/:id", authorization(2), updateCompany);
router.delete("/:id", authorization(2), deleteCompany);
router.post(
  "/:companyId/reviews",
  requireCompanyId,
  checkNeverReview,
  createReview
);
router.get(
  "/:companyId/reviews/:reviewId",
  requireCompanyId,
  requireReviewId,
  checkReviewAuthor,
  getReview
);
router.patch(
  "/:companyId/reviews/:reviewId",
  requireCompanyId,
  requireReviewId,
  checkReviewAuthor,
  updateReview
);
router.delete(
  "/:companyId/reviews/:reviewId",
  requireCompanyId,
  requireReviewId,
  checkReviewAuthor,
  deleteReview
);

module.exports = router;
