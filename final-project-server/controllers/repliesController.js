const { prisma } = require("../prisma");

const DEFAULT_PER_PAGE = 12;

const searchReplies = async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const perPage = Math.max(
    parseInt(req.query.perPage) || DEFAULT_PER_PAGE,
    DEFAULT_PER_PAGE
  );
  const options = {
    take: perPage,
    skip: (page - 1) * perPage,
    where: {
      forumId: Number(req.params.forumId),
      replyId: null, // only get parent replies
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      childReplies: true,
    },
  };
  const countOptions = {
    where: options.where,
  };

  const [companies, count] = await Promise.all([
    prisma.reply.findMany(options),
    prisma.reply.count(countOptions),
  ]);

  res.status(200).json({ items: companies, count });
};

const createReply = async (req, res) => {
  try {
    const { description } = req.body;
    const { id } = req.params;
    const forumId = Number(id);

    if (!description) {
      return res.status(400).json({ message: "Fields are must not be empty!" });
    }

    if (isNaN(forumId)) {
      return res.status(400).json({ message: "Id must be a number" });
    }

    const reply = await prisma.reply.create({
      data: {
        forumId,
        description,
        createdByName: req.user.fullname,
        createdByUsername: req.user.username,
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

module.exports = { searchReplies, createReply, updateReply, deleteReply };
