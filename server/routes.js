const express = require("express");
const { authentication } = require("./middleware/authentication");
const { authorization } = require("./middleware/authorization");

const authRoutes = require("./api/auth");
const commonRoutes = require("./api/common");
const usersRoutes = require("./api/users");
const forumsRoutes = require("./api/forums");
const repliesRoutes = require("./api/forums/replies");
const companiesRoutes = require("./api/companies");
const reviewsRoutes = require("./api/companies/reviews");

const router = express.Router();

router.get("/", (req, res) => res.json("Hello World!"));
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/common", authentication, commonRoutes);
router.use("/api/v1/users", authentication, authorization(2), usersRoutes);
router.use("/api/v1/forums", authentication, forumsRoutes);
router.use("/api/v1/forums", authentication, repliesRoutes);
router.use("/api/v1/companies", authentication, companiesRoutes);
router.use("/api/v1/companies", authentication, reviewsRoutes);

module.exports = router;
