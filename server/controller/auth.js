const jwt = require("jsonwebtoken");

const cookieConfig = require("../config/cookie");

const login = async (req, res) => {
  const { username, password } = req.body;
  const payload = { username };
  const accessToken = generateToken(payload, "access");
  const refreshToken = generateToken(payload, "refresh");
  res.cookie("accessToken", accessToken, cookieConfig);
  res.cookie("refreshToken", refreshToken, cookieConfig);
  const response = {
    isSuccess: true,
  };
  res.status(200).json(response);
};

const logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  const response = {
    isSuccess: true,
  };
  res.status(200).json(response);
};

const refresh = async (req, res) => {};

module.exports = {
  login,
  logout,
  refresh,
};
