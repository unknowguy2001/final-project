const cookieConfig = require("../config/cookie");
const { verifyToken, generateToken } = require("../utils/token");

const login = async (req, res) => {
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

const refresh = async (req, res) => {
  const refreshToken = req.signedCookies.refreshToken;
  if (!refreshToken) {
    const response = {
      isSuccess: false,
      message: "Refresh token not found",
    };
    return res.status(400).json(response);
  }

  // Check if refresh token is valid
  let payload;
  try {
    payload = verifyToken(refreshToken, "refresh");
  } catch (error) {
    const response = {
      isSuccess: false,
      message: "Invalid refresh token",
    };
    return res.status(400).json(response);
  }

  // Generate new access token
  const newPayload = { username: payload.username };
  const newAccessToken = generateToken(newPayload, "access");
  const newRefreshToken = generateToken(newPayload, "refresh");
  res.cookie("accessToken", newAccessToken, cookieConfig);
  res.cookie("refreshToken", newRefreshToken, cookieConfig);
  const response = {
    isSuccess: true,
    message: "Refresh successful",
  };
  res.status(200).json(response);
};

const getStatus = async (req, res) => {
  const accessToken = req.signedCookies.accessToken;
  try {
    const response = {
      isAuthenticated: accessToken && verifyToken(accessToken, "access"),
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
  logout,
  refresh,
  getStatus,
};
