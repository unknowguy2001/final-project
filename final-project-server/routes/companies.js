const express = require("express");

const {
  getTop4Popular,
  getCompanyById,
  addCompany,
  searchCompanies,
  updateCompany,
  deleteCompany,
  createReview,
} = require("../controllers/companiesController");

const router = express.Router();

router.get("/top-4-popular", getTop4Popular);
router.get("", searchCompanies);
router.get("/:id", getCompanyById);
router.post("", addCompany);
router.patch("/:id", updateCompany);
router.delete("/:id", deleteCompany);
router.post("/:companyId/reviews", createReview);

module.exports = router;
