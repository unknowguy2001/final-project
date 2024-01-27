const express = require("express");

const authHandlers = require("./auth.handlers");

const authRoutes = express.Router();

authRoutes.post("/login", authHandlers.login);
authRoutes.post("/refresh", authHandlers.refresh);
authRoutes.get("/info", authHandlers.getAuthInfo);

module.exports = authRoutes;
