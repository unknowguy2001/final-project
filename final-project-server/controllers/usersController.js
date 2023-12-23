const argon2 = require("argon2");

const { prisma } = require("../prisma");

const DEFAULT_PER_PAGE = 12;

module.exports.searchUsers = async (req, res) => {
  const searchQuery = req.query.searchQuery || "";
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const perPage = Math.max(
    parseInt(req.query.perPage) || DEFAULT_PER_PAGE,
    DEFAULT_PER_PAGE
  );
  const options = {
    take: perPage,
    skip: (page - 1) * perPage,
    select: {
      id: true,
      username: true,
      fullname: true,
      role: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  };
  const countOptions = {};

  if (searchQuery) {
    const columns = ["username", "fullname"];
    options.where = {
      OR: columns.map((column) => ({
        [column]: {
          contains: searchQuery,
          mode: "insensitive",
        },
      })),
    };
    countOptions.where = options.where;
  }

  const [users, count] = await Promise.all([
    prisma.user.findMany(options),
    prisma.user.count(countOptions),
  ]);

  res.status(200).json({ items: users, count });
};

module.exports.addUser = async (req, res) => {
  try {
    const { username, fullname, password, roleId } = req.body;
    const hashedPassword = await argon2.hash(password);
    await prisma.user.create({
      data: {
        username,
        fullname,
        password: hashedPassword,
        roleId: parseInt(roleId),
      },
    });
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({
        message: "Missing userId",
      });
    }
    const parsedUserId = parseInt(userId);
    await prisma.user.delete({
      where: {
        id: parsedUserId,
      },
    });
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({
        message: "Missing userId",
      });
    }
    const parsedUserId = parseInt(userId);
    const user = await prisma.user.findUnique({
      where: {
        id: parsedUserId,
      },
      select: {
        id: true,
        username: true,
        fullname: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      item: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({
        message: "Missing userId",
      });
    }
    const parsedUserId = parseInt(userId);
    const { username, fullname, roleId } = req.body;
    const parsedRoleId = parseInt(roleId);
    await prisma.user.update({
      where: {
        id: parsedUserId,
      },
      data: {
        username,
        fullname,
        roleId: parsedRoleId,
      },
    });
    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
