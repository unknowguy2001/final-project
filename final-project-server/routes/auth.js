const express = require("express");

const {
  login,
  logout,
  refresh,
  getAuthInfo,
} = require("../controllers/authController");
const authentication = require("../middlewares/authentication");

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/info", authentication, getAuthInfo);

module.exports = router;
