const express = require("express");

const {
  getTop4Popular,
  getCompanyById,
  addCompany,
  searchCompanies,
  updateCompany,
  deleteCompany,
  createReview,
  deleteReview,
  updateReview,
  getReview,
} = require("../controllers/companiesController");

const router = express.Router();

router.get("/top-4-popular", getTop4Popular);
router.get("", searchCompanies);
router.get("/:id", getCompanyById);
router.post("", addCompany);
router.patch("/:id", updateCompany);
router.delete("/:id", deleteCompany);

router.post("/:companyId/reviews", createReview);
router.get("/:companyId/reviews/:reviewId", getReview);
router.patch("/:companyId/reviews/:reviewId", updateReview);
router.delete("/:companyId/reviews/:reviewId", deleteReview);

module.exports = router;
