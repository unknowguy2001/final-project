const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createReply = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: `Error : ${error.message}` });
  }
};

const updateReply = async (req, res) => {
  try {
    const { id, forumId } = req.params;
    const { description } = req.body;
    const replyId = Number(id);

    if (isNaN(replyId) && isNaN(Number(forumId))) {
      return res.status(400).json({ message: "Id must be a number" });
    }

    const replyInfo = await prisma.reply.findUnique({
      where: { id: replyId },
    });

    if (!replyInfo) {
      return res
        .status(400)
        .json({ message: "This reply doesn't really exist!" });
    }

    if (req.user.username != replyInfo.createdBy) {
      return res.status(400).json({ message: "This is not your reply!" });
    }

    if (!description) {
      console.log(description);
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
  } catch (error) {
    res.status(500).json({ message: `Error : ${error.message}` });
  }
};

const deleteReply = async (req, res) => {
  try {
    const { id, forumId } = req.params;
    const replyId = Number(id);

    if (isNaN(replyId) && isNaN(Number(forumId))) {
      return res.status(400).json({ message: "Id must be a number" });
    }

    const replyInfo = await prisma.reply.findUnique({
      where: { id: replyId },
    });

    if (!replyInfo) {
      return res
        .status(400)
        .json({ message: "This reply doesn't really exist." });
    }

    if (req.user.username != replyInfo.createdBy) {
      return res.status(400).json({ message: "This is not your reply!" });
    }

    const reply = await prisma.reply.delete({ where: { id: replyId } });

    if (!reply) {
      return res.status(400).json({ message: "Can't delete reply forum!" });
    }

    res.status(200).json({ message: "Deleted reply!" });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

module.exports = { createReply, updateReply, deleteReply };
