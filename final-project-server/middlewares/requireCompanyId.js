const requireCompanyId = async (req, res, next) => {
  const { companyId } = req.params;

  const parsedCompanyId = parseInt(companyId);

  // Check if companyId is a number
  if (isNaN(parsedCompanyId)) {
    return res.status(400).json({
      message: "companyId must be a number",
    });
  }

  req.parsedCompanyId = parsedCompanyId;

  next();
};

module.exports = { requireCompanyId };
