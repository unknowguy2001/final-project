const cookieConfig = require("../config/cookie");
const { generateToken } = require("../utils/token");

const login = async (req, res) => {
  const users = [
    {
      username: "test",
      password: "test",
    },
  ];
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    const response = {
      isSuccess: false,
      message: "Invalid username or password",
    };
    return res.status(400).json(response);
  }

  // Check if username and password are valid
  const user = users.find((user) => user.username === username);
  if (!user || user.password !== password) {
    const response = {
      isSuccess: false,
      message: "Invalid username or password",
    };
    return res.status(400).json(response);
  }

  // Generate access token and refresh token
  const payload = { username };
  const accessToken = generateToken(payload, "access");
  const refreshToken = generateToken(payload, "refresh");
  res.cookie("accessToken", accessToken, cookieConfig);
  res.cookie("refreshToken", refreshToken, cookieConfig);
  const response = {
    isSuccess: true,
    message: "Login successful",
  };
  res.status(200).json(response);
};

const logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  const response = {
    isSuccess: true,
    message: "Logout successful",
  };
  res.status(200).json(response);
};

const refresh = async (req, res) => {};

module.exports = {
  login,
  logout,
  refresh,
};
