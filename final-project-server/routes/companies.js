const express = require("express");

const {
  getTop4Popular,
  getCompanyById,
  addCompany,
  searchCompanies,
  updateCompany,
  deleteCompany,
  createReview,
  updateReview,
} = require("../controllers/companiesController");

const router = express.Router();

router.get("/top-4-popular", getTop4Popular);
router.get("", searchCompanies);
router.get("/:id", getCompanyById);
router.post("", addCompany);
router.patch("/:id", updateCompany);
router.delete("/:id", deleteCompany);
router.post("/:companyId/reviews", createReview);
// get review
// update review
router.patch("/:companyId/reviews/:reviewId", updateReview);
// delete review

module.exports = router;
