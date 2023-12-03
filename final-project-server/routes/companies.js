const express = require("express");

const {
  getTop4Popular,
  getCompanyById,
  addCompany,
  getAllCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/companiesController");
const authentication = require("../middleware/authentication");

const router = express.Router();

router.get("/top-4-popular", authentication, getTop4Popular);
router.get("/:id", authentication, getCompanyById);
router.post("", authentication, addCompany);
router.get("", authentication, getAllCompany);
router.patch("/:id", authentication, updateCompany);
router.delete("/:id", authentication, deleteCompany);

module.exports = router;
