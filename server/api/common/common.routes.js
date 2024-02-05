const express = require("express");

const commonHandlers = require("./common.handlers");

const commonRoutes = express.Router();

commonRoutes.get("/roles", commonHandlers.roles);
commonRoutes.get("/hashtags", commonHandlers.hashtags);

module.exports = commonRoutes;
