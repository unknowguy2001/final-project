const express = require("express");

const companiesHandlers = require("./companies.handlers");
const { authorization } = require("../../middleware/authorization");

const companiesRoutes = express.Router();

companiesRoutes.get("/top-popular", companiesHandlers.getTopPopular);
companiesRoutes.get("", companiesHandlers.searchCompanies);
companiesRoutes.get("/:id", companiesHandlers.getCompanyById);
companiesRoutes.post("", authorization(2), companiesHandlers.createCompany);
companiesRoutes.patch(
  "/:id",
  authorization(2),
  companiesHandlers.updateCompany
);
companiesRoutes.delete(
  "/:id",
  authorization(2),
  companiesHandlers.deleteCompany
);

module.exports = companiesRoutes;
