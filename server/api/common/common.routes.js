const express = require("express");

const commonHandlers = require("./common.handlers");
const { authorization } = require("../../middleware/authorization");
const { authentication } = require("../../middleware/authentication");

const commonRoutes = express.Router();

commonRoutes.get("/roles", authorization(2), commonHandlers.roles);
commonRoutes.get("/hashtags", commonHandlers.hashtags);
commonRoutes.get("/provinces", authentication, commonHandlers.provinces);
commonRoutes.get("/google-form-url", commonHandlers.getGoogleFormUrl);

module.exports = commonRoutes;
