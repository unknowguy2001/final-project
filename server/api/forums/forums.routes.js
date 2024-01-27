const express = require("express");

const forumsHandlers = require("./forums.handlers");

const forumsRoutes = express.Router();

forumsRoutes.get("", forumsHandlers.searchForums);
forumsRoutes.post("", forumsHandlers.createForum);
forumsRoutes.get("/:id", forumsHandlers.getForumById);
forumsRoutes.patch("/:id", forumsHandlers.updateForum);
forumsRoutes.delete("/:id", forumsHandlers.deleteForum);

module.exports = forumsRoutes;
