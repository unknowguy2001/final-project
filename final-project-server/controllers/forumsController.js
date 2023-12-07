const { prisma } = require("../prisma");

const searchForum = async (req, res) => {
  try {
    const PER_PAGE = 12;
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const searchTerm = req.query.search || "";
    const options = {
      take: PER_PAGE,
      skip: (page - 1) * PER_PAGE,
    };
    const countOptions = {};

    if (searchTerm) {
      options.where = {
        OR: [
          {
            title: { contains: searchTerm, mode: "insensitive" },
          },
          {
            description: { contains: searchTerm, mode: "insensitive" },
          },
        ],
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

    if (isNaN(Number(id))) {
      return res.status(400).json({ message: "id must be a number" });
    }

    const forum = await prisma.forum.findUnique({
      where: { id: Number(id) },
      include: { replies: true },
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
    const { createdBy, title, description } = req.body;
    const isInvalid = !createdBy || !title || !description;

    if (isInvalid) {
      return res.status(400).json({ message: "Fields are must not be empty!" });
    }

    const forum = await prisma.forum.create({
      data: {
        createdBy,
        title,
        description,
      },
    });

    if (!forum) {
      return res.status(404).json({ message: "Can't create!" });
    }

    res.status(201).json({ message: "Created forum!" });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

const deleteForum = async (req, res) => {
  try {
    const { id } = req.params;
    const forumId = Number(id);

    if (isNaN(forumId)) {
      return res.status(400).json({ message: "Id must be a number" });
    }
    const forumInfo = await prisma.forum.findUnique({ where: { id: forumId } });

    if (!forumInfo) {
      return res
        .status(400)
        .json({ message: `This forum doesn't really exist!` });
    }

    if (req.user.username != forumInfo.createdBy) {
      return res.status(400).json({ message: "This is not your forum!" });
    }

    const forum = await prisma.forum.delete({ where: { id: forumId } });

    if (!forum) {
      return res.status(400).json({ message: "Can't delete forum!" });
    }

    res.status(200).json({ message: "Deleted forum!" });
  } catch (error) {
    res.status(500).json({ message: `Error : ${error.message}` });
  }
};

const updateForum = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const forumId = Number(id);

    console.log(req.user);

    if (isNaN(forumId)) {
      return res.status(400).json({ message: "Id must be a number" });
    }

    const forumInfo = await prisma.forum.findUnique({ where: { id: forumId } });

    if (req.user.username != forumInfo.createdBy) {
      return res.status(400).json({ message: "This is not your forum!" });
    }

    const forum = await prisma.forum.update({
      where: { id: forumId },
      data: {
        title,
        description,
      },
    });

    if (!forum) {
      return res.status(400).json({ message: "Can't update forum!" });
    }

    res.status(200).json({ message: "Updated forum!" });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

module.exports = {
  getAllForum: searchForum,
  getForumById,
  createForum,
  deleteForum,
  updateForum,
};
