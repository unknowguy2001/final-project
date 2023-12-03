const express = require("express");

const {
  getTop4Popular,
  getCompanyById,
  addCompany,
  getAllCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/companiesController");

const router = express.Router();

router.get("/top-4-popular", getTop4Popular);
router.get("/:id", getCompanyById);
router.post("", addCompany);
router.get("", getAllCompany);
router.patch("/:id", updateCompany);
router.delete("/:id", deleteCompany);

module.exports = router;
