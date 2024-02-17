const argon2 = require("argon2");

const { prisma } = require("../../utils/prisma");
const { verifyToken, generateToken } = require("../../utils/token");

const login = async (req, res) => {
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

const register = async (req, res) => {
  const { username, password, firstName, lastName } = req.body;

  try {
    if (!/^\d{12}-\d{1}$/.test(username)) {
      throw new Error("Invalid username, please use your student ID");
    }

    if (!username || !password || !firstName || !lastName) {
      throw new Error(
        "Username, password, first name and last name are required"
      );
    }

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    if (!/[A-Z]/.test(password)) {
      throw new Error("Password must not contain uppercase letters");
    }

    if (!/\d/.test(password)) {
      throw new Error("Password must contain at least 1 number");
    }

    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password)) {
      throw new Error("Password must contain at least 1 special character");
    }

    const hashedPassword = await argon2.hash(password);

    const entryYear = parseInt(username.slice(2, 4));
    const currentYear = (new Date().getFullYear() + 543).toString().slice(2, 4);
    const totalYear = Math.abs(entryYear - currentYear);

    const EXPERIENCE_ROLE_ID = 1;
    const INEXPERIENCE_ROLE_ID = 3;

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        fullname: `${firstName} ${lastName}`,
        roleId: totalYear >= 4 ? EXPERIENCE_ROLE_ID : INEXPERIENCE_ROLE_ID,
      },
    });

    const payload = { username: user.username, fullname: user.fullname };
    const accessToken = generateToken(payload, "access");
    const refreshToken = generateToken(payload, "refresh");

    // Send user info to client
    res.status(200).json({
      message: "Register successful",
      authInfo: {
        isAuthenticated: true,
        user: payload,
        isAdmin: false,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Register failed",
      authInfo: {
        isAuthenticated: false,
        user: null,
        isAdmin: false,
      },
    });
  }
};

const refresh = async (req, res) => {
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

const getAuthInfo = async (req, res) => {
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
      return res.status(401).json();
    }

    const foundUser = await prisma.user.findUnique({
      where: {
        username: payload.username,
      },
    });

    if (!foundUser) {
      return res.status(401).json();
    }

    const isAdmin = foundUser.roleId === 2;

    const { username, fullname } = foundUser;

    res.status(200).json({
      isAuthenticated: true,
      user: {
        username,
        fullname,
      },
      isAdmin,
    });
  } catch (error) {
    res.status(500).json({
      isAuthenticated: false,
      user: null,
      isAdmin: false,
    });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    if (!oldPassword || !newPassword) {
      throw new Error("Old password and new password are required");
    }

    if (newPassword.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    if (!/[A-Z]/.test(newPassword)) {
      throw new Error("Password must not contain uppercase letters");
    }

    if (!/\d/.test(newPassword)) {
      throw new Error("Password must contain at least 1 number");
    }

    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(newPassword)) {
      throw new Error("Password must contain at least 1 special character");
    }

    const username = req.user.username;

    const foundUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!foundUser) {
      throw new Error("Invalid username");
    }

    if (!(await argon2.verify(foundUser.password, oldPassword))) {
      throw new Error("Invalid old password");
    }

    const hashedPassword = await argon2.hash(newPassword);

    await prisma.user.update({
      where: {
        username,
      },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200).json({
      message: "Change password successful",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Change password failed",
    });
  }
};

module.exports = {
  login,
  register,
  refresh,
  getAuthInfo,
  changePassword,
};
