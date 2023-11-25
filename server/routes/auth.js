const express = require("express");

const { login, logout, refresh, getStatus } = require("../controller/auth");

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/status", getStatus);

module.exports = router;
