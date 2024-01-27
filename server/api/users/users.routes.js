const express = require("express");

const usersHandlers = require("./users.handlers");

const usersRoutes = express.Router();

usersRoutes.get("", usersHandlers.searchUsers);
usersRoutes.post("", usersHandlers.addUser);
usersRoutes.delete("/:userId", usersHandlers.deleteUser);
usersRoutes.get("/:userId", usersHandlers.getUser);
usersRoutes.patch("/:userId", usersHandlers.updateUser);

module.exports = usersRoutes;
