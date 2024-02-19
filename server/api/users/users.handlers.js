const argon2 = require("argon2");

const { prisma } = require("../../utils/prisma");
const { DEFAULT_PER_PAGE } = require("../../constants/pagination");

const searchUsers = async (req, res) => {
  const searchQuery = req.query.searchQuery || "";
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const perPage = Math.max(
    parseInt(req.query.perPage) || DEFAULT_PER_PAGE,
    DEFAULT_PER_PAGE,
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

const createUser = async (req, res) => {
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
      message: "สร้างผู้ใช้สำเร็จ",
    });
  } catch (error) {
    res.status(500).json({
      message: "เกิดข้อผิดพลาด",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.userId,
      },
    });
    res.status(200).json({
      message: "ลบผู้ใช้สำเร็จ",
    });
  } catch (error) {
    res.status(500).json({
      message: "เกิดข้อผิดพลาด",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
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
    res.status(200).json({
      item: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "เกิดข้อผิดพลาด",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, fullname, roleId } = req.body;
    await prisma.user.update({
      where: {
        id: req.userId,
      },
      data: {
        username,
        fullname,
        roleId: parseInt(roleId),
      },
    });
    res.status(200).json({
      message: "อัพเดทข้อมูลสำเร็จ",
    });
  } catch (error) {
    res.status(500).json({
      message: "เกิดข้อผิดพลาด",
    });
  }
};

module.exports = {
  searchUsers,
  createUser,
  deleteUser,
  getUser,
  updateUser,
};
