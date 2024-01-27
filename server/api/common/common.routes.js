const express = require("express");

const commonHandlers = require("./common.handlers");

const commonRoutes = express.Router();

commonRoutes.get("/roles", commonHandlers.roles);

module.exports = commonRoutes;
