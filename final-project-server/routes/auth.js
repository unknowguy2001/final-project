const express = require("express");

const {
  login,
  refresh,
  getAuthInfo,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.get("/info", getAuthInfo);

module.exports = router;
