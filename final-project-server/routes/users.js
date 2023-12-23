const express = require("express");

const {
  searchUsers,
  addUser,
  deleteUser,
  getUser,
  updateUser,
} = require("../controllers/usersController");

const router = express.Router();

router.get("", searchUsers);
router.post("", addUser);
router.delete("/:userId", deleteUser);
router.get("/:userId", getUser);
router.patch("/:userId", updateUser);

module.exports = router;
