const express = require("express");

const commonHandlers = require("./common.handlers");
const { authorization } = require("../../middleware/authorization");
const { authentication } = require("../../middleware/authentication");

const commonRoutes = express.Router();

commonRoutes.get(
  "/roles",
  authentication,
  authorization(2),
  commonHandlers.roles
);
commonRoutes.get("/hashtags", authentication, commonHandlers.hashtags);
commonRoutes.get("/provinces", authentication, commonHandlers.provinces);
commonRoutes.get(
  "/google-form-url",
  authentication,
  commonHandlers.getGoogleFormUrl
);
commonRoutes.get("/company-names", commonHandlers.companyNames);

module.exports = commonRoutes;
