const express = require("express");

const { authentication } = require("../../middleware/authentication");
const authHandlers = require("./auth.handlers");

const authRoutes = express.Router();

authRoutes.post("/login", authHandlers.login);
authRoutes.post("/register", authHandlers.register);
authRoutes.post("/refresh", authHandlers.refresh);
authRoutes.get("/info", authHandlers.getAuthInfo);
authRoutes.post(
  "/change-password",
  authentication,
  authHandlers.changePassword
);

module.exports = authRoutes;
