const checkUserId = (req, res, next) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({
      message: "Missing userId",
    });
  }
  req.userId = parseInt(userId);
};

module.exports = {
  checkUserId,
};
