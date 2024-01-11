const argon2 = require("argon2");

const { prisma } = require("../prisma");
const { verifyToken, generateToken } = require("../utils/token");

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw new Error("Username and password are required");
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new Error("Invalid username or password");
    }

    if (!user || !(await argon2.verify(user.password, password))) {
      throw new Error("Invalid username or password");
    }

    const payload = { username, fullname: user.fullname };
    const accessToken = generateToken(payload, "access");
    const refreshToken = generateToken(payload, "refresh");

    const isAdmin = user.roleId === 2;

    // Send user info to client
    res.status(200).json({
      message: "Login successful",
      authInfo: {
        isAuthenticated: true,
        user: payload,
        isAdmin,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Login failed",
      authInfo: {
        isAuthenticated: false,
        user: null,
        isAdmin: false,
      },
    });
  }
};

module.exports.logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({
    message: "Logout successful",
  });
};

module.exports.refresh = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }

    const payload = verifyToken(refreshToken, "refresh");

    if (!payload) {
      throw new Error("Invalid refresh token");
    }

    const newPayload = {
      username: payload.username,
      fullname: payload.fullname,
    };
    const newAccessToken = generateToken(newPayload, "access");
    const newRefreshToken = generateToken(newPayload, "refresh");
    res.status(200).json({
      tokens: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    res.status(400).json();
  }
};

module.exports.getAuthInfo = async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];

    if (!accessToken) {
      return res.status(200).json({
        isAuthenticated: false,
        user: null,
        isAdmin: false,
      });
    }

    const payload = verifyToken(accessToken, "access");

    if (!payload) {
      return res.status(200).json({
        isAuthenticated: false,
        user: null,
        isAdmin: false,
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        username: payload.username,
      },
    });

    const isAdmin = user.roleId === 2;

    res.status(200).json({
      isAuthenticated: true,
      user: {
        username: user.username,
        fullname: user.fullname,
      },
      isAdmin,
    });
  } catch (error) {
    res.status(200).json({
      isAuthenticated: false,
      user: null,
      isAdmin: false,
    });
  }
};
