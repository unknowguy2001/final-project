const { prisma } = require("../../utils/prisma");

const { DEFAULT_PER_PAGE } = require("../../constants/pagination");

const searchForums = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const perPage = Math.max(
      parseInt(req.query.perPage) || DEFAULT_PER_PAGE,
      DEFAULT_PER_PAGE,
    );
    const searchQuery = req.query.searchQuery || "";
    const options = {
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: { createdAt: "desc" },
    };
    const countOptions = {};

    if (searchQuery) {
      const columns = ["title", "description", "createdByName"];
      options.where = {
        OR: columns.map((column) => ({
          [column]: { contains: searchQuery, mode: "insensitive" },
        })),
      };

      countOptions.where = options.where;
    }
    const [forums, count] = await Promise.all([
      prisma.forum.findMany(options),
      prisma.forum.count(countOptions),
    ]);

    res.status(200).json({ items: forums, count });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

const getForumById = async (req, res) => {
  try {
    const { id } = req.params;

    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return res.status(400).json({ message: "Id ควรเป็นตัวเลข" });
    }

    const forum = await prisma.forum.findUnique({
      where: { id: parsedId },
    });

    if (!forum) {
      return res.status(404).json({ item: null });
    }

    res.status(200).json({ item: forum });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

const createForum = async (req, res) => {
  try {
    const { title, description } = req.body;

    const isValid = title && description;

    if (!isValid) {
      return res.status(400).json({ message: "กรุณากรอกหัวข้อและรายละเอียด" });
    }

    const forum = await prisma.forum.create({
      data: {
        title,
        description,
        createdByName: req.user.fullname,
        createdByUsername: req.user.username,
      },
    });

    if (!forum) {
      return res.status(400).json({ message: "ไม่สามารถสร้าง Forum ได้" });
    }

    res.status(201).json({ message: "สร้าง Forum สำเร็จ", forumId: forum.id });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

const deleteForum = async (req, res) => {
  try {
    const { id } = req.params;
    const parsedForumId = Number(id);

    if (isNaN(parsedForumId)) {
      return res.status(400).json({ message: "Id ควรเป็นตัวเลข" });
    }

    const forum = await prisma.forum.delete({
      where: { id: parsedForumId, createdByUsername: req.user.username },
    });

    if (!forum) {
      return res.status(400).json({ message: "ไม่สามารถลบ Forum ได้" });
    }

    res.status(200).json({ message: "ลบ Forum สำเร็จ" });
  } catch (error) {
    res.status(500).json({ message: `Error : ${error.message}` });
  }
};

const updateForum = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const isValid = title && description;

    if (!isValid) {
      return res.status(400).json({ message: "กรุณากรอกหัวข้อและรายละเอียด" });
    }

    const forumId = Number(id);

    if (isNaN(forumId)) {
      return res.status(400).json({ message: "Id ควรเป็นตัวเลข" });
    }

    const forum = await prisma.forum.update({
      where: { id: forumId, createdByUsername: req.user.username },
      data: {
        title,
        description,
      },
    });

    if (!forum) {
      return res.status(400).json({ message: "ไม่สามารถอัพเดท Forum ได้" });
    }

    res.status(200).json({ message: "อัพเดท Forum สำเร็จ" });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

module.exports = {
  searchForums,
  getForumById,
  createForum,
  deleteForum,
  updateForum,
};
