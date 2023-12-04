const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllForum = async (req, res) => {
  const forums = await prisma.forum.findMany();

  res.status(200).json({ items: forums });
};

const getForumById = async (req, res) => {
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
};

const createForum = async (req, res) => {
  const { createdBy, title, description } = req.body;
  const isNotValid = !createdBy || !title || !description;

  if (isNotValid) {
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
};

const deleteForum = async (req, res) => {
  const { id } = req.params;
  const forumId = Number(id);

  if (isNaN(forumId)) {
    return res.status(400).json({ message: "Id must be a number" });
  }

  const forum = await prisma.forum.delete({ where: { id: forumId } });

  if (!forum) {
    return res.status(400).json({ message: "Can't delete forum!" });
  }

  res.status(200).json({ message: "Deleted forum!" });
};

const updateForum = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const forumId = Number(id);

  if (isNaN(forumId)) {
    return res.status(400).json({ message: "Id must be a number" });
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
};

const searchForum = async (req, res) => {
  const { input } = req.body;

  const forums = await prisma.forum.findMany({
    where: { OR: [{ title: input }, { description: input }] },
  });

  res.status(200).json({ items: forums });
};

module.exports = {
  getAllForum,
  getForumById,
  createForum,
  deleteForum,
  updateForum,
  searchForum,
};
