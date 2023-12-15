const express = require("express");

const {
  searchForums,
  getForumById,
  createForum,
  updateForum,
  deleteForum,
} = require("../controllers/forumsController");
const {
  searchReplies,
  createReply,
  updateReply,
  deleteReply,
} = require("../controllers/repliesController");

const router = express.Router();

router.get("", searchForums);
router.post("", createForum);
router.get("/:id", getForumById);
router.patch("/:id", updateForum);
router.delete("/:id", deleteForum);
router.get("/:forumId/replies", searchReplies);
router.post("/:id/replies", createReply);
router.patch("/:forumId/replies/:id", updateReply);
router.delete("/:forumId/replies/:id", deleteReply);

module.exports = router;
