const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createReply = async (req, res) => {
  const { description, createdBy } = req.body;
  const isNotValid = !description || !createdBy;
  const { id } = req.params;
  const forumId = Number(id);

  if (isNotValid) {
    return res.status(400).json({ message: "Fields are must not be empty!" });
  }

  if (isNaN(forumId)) {
    return res.status(400).json({ message: "Id must be a number" });
  }

  const reply = await prisma.reply.create({
    data: {
      forumId,
      description,
      createdBy,
    },
  });

  if (!reply) {
    return res.status(400).json({ message: "Can't reply forum!" });
  }

  res.status(200).json({ message: "Replyed forum!" });
};

const updateReply = async (req, res) => {
  const { id, forumId } = req.params;
  const { description } = req.body;
  const replyId = Number(id);

  if (isNaN(replyId) && isNaN(Number(forumId))) {
    return res.status(400).json({ message: "Id must be a number" });
  }

  if (!description) {
    return res.status(400).json({ message: "Fields are must not be empty!" });
  }

  const reply = await prisma.reply.update({
    where: { id: replyId },
    data: {
      description,
    },
  });

  if (!reply) {
    return res.status(400).json({ message: "Can't update reply forum!" });
  }

  res.status(200).json({ message: "Updated reply!" });
};

const deleteReply = async (req, res) => {
  const { id, forumId } = req.params;
  const replyId = Number(id);

  if (isNaN(replyId) && isNaN(Number(forumId))) {
    return res.status(400).json({ message: "Id must be a number" });
  }

  const reply = await prisma.reply.delete({ where: { id: replyId } });

  if (!reply) {
    return res.status(400).json({ message: "Can't delete reply forum!" });
  }

  res.status(200).json({ message: "Deleted reply!" });
};

module.exports = { createReply, updateReply, deleteReply };
