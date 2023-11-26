const express = require("express");

const {
  login,
  logout,
  refresh,
  checkAuthStatus,
} = require("../controller/auth");

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/status", checkAuthStatus);

module.exports = router;
