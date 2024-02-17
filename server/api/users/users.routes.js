const express = require("express");

const usersHandlers = require("./users.handlers");
const { checkUserId } = require("./users.middleware");

const usersRoutes = express.Router();

usersRoutes.get("", usersHandlers.searchUsers);
usersRoutes.post("", usersHandlers.createUser);
usersRoutes.delete("/:userId", checkUserId, usersHandlers.deleteUser);
usersRoutes.get("/:userId", checkUserId, usersHandlers.getUser);
usersRoutes.patch("/:userId", checkUserId, usersHandlers.updateUser);

module.exports = usersRoutes;
