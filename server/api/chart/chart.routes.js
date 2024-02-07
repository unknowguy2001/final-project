const express = require("express");

const chartHandlers = require("./chart.handlers");

const commonRoutes = express.Router();

commonRoutes.get("/hashtags", chartHandlers.hashtags);
commonRoutes.get("/roles", chartHandlers.roles);

module.exports = commonRoutes;
