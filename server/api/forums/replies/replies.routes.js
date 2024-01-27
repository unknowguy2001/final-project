const express = require("express");

const repliesHandlers = require("./replies.handlers");

const repliesRoutes = express.Router();

repliesRoutes.get("/:forumId/replies", repliesHandlers.searchReplies);
repliesRoutes.post("/:forumId/replies", repliesHandlers.createReply);
repliesRoutes.patch("/:forumId/replies/:id", repliesHandlers.updateReply);
repliesRoutes.delete("/:forumId/replies/:id", repliesHandlers.deleteReply);

module.exports = repliesRoutes;
