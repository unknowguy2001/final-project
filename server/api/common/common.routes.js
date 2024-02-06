const express = require("express");

const commonHandlers = require("./common.handlers");
const { authorization } = require("../../middleware/authorization");

const commonRoutes = express.Router();

commonRoutes.get("/roles", authorization(2), commonHandlers.roles);
commonRoutes.get("/hashtags", commonHandlers.hashtags);

module.exports = commonRoutes;
