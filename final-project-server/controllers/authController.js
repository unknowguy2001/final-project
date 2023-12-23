const argon2 = require("argon2");

const { prisma } = require("../prisma");
const cookieConfig = require("../config/cookie");
const { verifyToken, generateToken } = require("../utils/token");

const login = async (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Invalid username or password",
      authInfo: {
        isAuthenticated: false,
        user: null,
        isAdmin: false,
      },
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid username or password",
      authInfo: {
        isAuthenticated: false,
        user: null,
        isAdmin: false,
      },
    });
  }

  // Check if password is correct
  const isPasswordCorrect = await argon2.verify(user.password, password);
  if (!isPasswordCorrect) {
    return res.status(400).json({
      message: "Invalid username or password",
      authInfo: {
        isAuthenticated: false,
        user: null,
        isAdmin: false,
      },
    });
  }

  // Generate access token and refresh token and send them to client
  const payload = { username, fullname: user.fullname };
  const accessToken = generateToken(payload, "access");
  const refreshToken = generateToken(payload, "refresh");
  res.cookie("accessToken", accessToken, cookieConfig);
  res.cookie("refreshToken", refreshToken, cookieConfig);

  // Send user info to client
  res.status(200).json({
    message: "Login successful",
    authInfo: {
      isAuthenticated: true,
      user: payload,
      isAdmin: user.roleId === 2,
    },
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

  if (!payload) {
    return res.status(400).json({
      message: "Invalid refresh token",
    });
  }

  // Generate new access token
  const newPayload = { username: payload.username, fullname: payload.fullname };
  const newAccessToken = generateToken(newPayload, "access");
  const newRefreshToken = generateToken(newPayload, "refresh");
  res.cookie("accessToken", newAccessToken, cookieConfig);
  res.cookie("refreshToken", newRefreshToken, cookieConfig);
  res.status(200).json();
};

const getAuthInfo = async (req, res) => {
  const accessToken = req.signedCookies.accessToken;

  if (!accessToken) {
    return res.status(200).json({
      isAuthenticated: false,
      user: null,
      isAdmin: false,
    });
  }

  try {
    const payload = verifyToken(accessToken, "access");

    if (!payload) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    const user = await prisma.user.findFirst({
      where: {
        username: payload.username,
      },
    });

    res.status(200).json({
      isAuthenticated: true,
      user: payload,
      isAdmin: user.roleId === 2,
    });
  } catch (error) {
    res.status(200).json({
      isAuthenticated: false,
      user: null,
      isAdmin: false,
    });
  }
};

module.exports = {
  login,
  logout,
  refresh,
  getAuthInfo,
};
