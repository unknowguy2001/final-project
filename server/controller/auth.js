const cookieConfig = require("../config/cookie");
const { verifyToken, generateToken } = require("../utils/token");

const login = async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Invalid username or password",
      isAuthenticated: false,
      user: null,
    });
  }

  // Check if username and password are valid
  const loginDataResponse = await fetch(
    "http://app.rmutp.ac.th/mobilews/login/getLogindata",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );
  const loginData = await loginDataResponse.json();
  if (loginData.status === "Failed") {
    return res.status(400).json({
      message: "Invalid username or password",
      isAuthenticated: false,
      user: null,
    });
  }

  // Generate access token and refresh token and send them to client
  const payload = { username };
  const accessToken = generateToken(payload, "access");
  const refreshToken = generateToken(payload, "refresh");
  res.cookie("accessToken", accessToken, cookieConfig);
  res.cookie("refreshToken", refreshToken, cookieConfig);

  // Send user info to client
  const verifiedPayload = verifyToken(accessToken, "access");
  res.status(200).json({
    message: "Login successful",
    isAuthenticated: true,
    user: verifiedPayload,
  });
};

const logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({
    message: "Logout successful",
  });
};

const refresh = async (req, res) => {
  const refreshToken = req.signedCookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh token not found",
    });
  }

  // Check if refresh token is valid
  let payload;
  try {
    payload = verifyToken(refreshToken, "refresh");
  } catch (error) {
    return res.status(400).json({
      message: "Invalid refresh token",
    });
  }

  // Generate new access token
  const newPayload = { username: payload.username };
  const newAccessToken = generateToken(newPayload, "access");
  const newRefreshToken = generateToken(newPayload, "refresh");
  res.cookie("accessToken", newAccessToken, cookieConfig);
  res.cookie("refreshToken", newRefreshToken, cookieConfig);
  res.status(200).json({
    message: "Refresh successful",
  });
};

const getAuthInfo = (req, res) => {
  const accessToken = req.signedCookies.accessToken;
  try {
    const payload = verifyToken(accessToken, "access");
    res.status(200).json({
      isAuthenticated: true,
      user: payload,
    });
  } catch (error) {
    res.status(200).json({
      isAuthenticated: false,
      user: null,
    });
  }
};

module.exports = {
  login,
  logout,
  refresh,
  getAuthInfo,
};
