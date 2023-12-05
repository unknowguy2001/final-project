const express = require("express");

const {
  getAllForum,
  getForumById,
  createForum,
  updateForum,
  deleteForum,
} = require("../controllers/forumsController");
const {
  createReply,
  updateReply,
  deleteReply,
} = require("../controllers/repliesController");

const router = express.Router();

router.get("", getAllForum);
router.post("", createForum);
router.get("/:id", getForumById);
router.patch("/:id", updateForum);
router.delete("/:id", deleteForum);
router.post("/:id/replies", createReply);
router.patch("/:forumId/replies/:id", updateReply);
router.delete("/:forumId/replies/:id", deleteReply);

module.exports = router;
