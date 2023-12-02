const express = require("express");

const {
  getTop4Popular,
  getCompanyById,
} = require("../controllers/companiesController");

const router = express.Router();

router.get("/top-4-popular", getTop4Popular);
router.get("/:id", getCompanyById);

module.exports = router;
