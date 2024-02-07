const thaiCut = require("thai-cut-slim");

const { badWords } = require("../../../constants/bad-words");
const { prisma } = require("../../../utils/prisma");
const { DEFAULT_PER_PAGE } = require("../../../constants/pagination");

module.exports.searchReplies = async (req, res) => {
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
      childReplies: {
        orderBy: {
          createdAt: "asc",
        },
      },
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

module.exports.createReply = async (req, res) => {
  try {
    const { description } = req.body;
    const { forumId } = req.params;

    const parsedForumId = Number(forumId);
    const replyId = Number(req.query.replyId);

    if (!description) {
      return res.status(400).json({ message: "Fields are must not be empty!" });
    }

    if (isNaN(parsedForumId)) {
      return res.status(400).json({ message: "Id must be a number" });
    }

    const words = thaiCut.cut(description);

    for (let i = 0; i < words.length; i++) {
      if (badWords.includes(words[i].toLowerCase())) {
        return res.status(400).json({ message: "Bad words are not allowed!" });
      }
    }

    const reply = await prisma.reply.create({
      data: {
        forumId: parsedForumId,
        description,
        createdByName: req.user.fullname,
        createdByUsername: req.user.username,
        replyId: isNaN(replyId) ? null : replyId,
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

module.exports.updateReply = async (req, res) => {
  try {
    const { id, forumId } = req.params;
    const parsedReplyId = Number(id);
    const parsedForumId = Number(forumId);

    await prisma.reply.update({
      where: {
        id: parsedReplyId,
        forumId: parsedForumId,
        createdByUsername: req.user.username,
      },
      data: {
        description: req.body.description,
      },
    });

    res.status(200).json({ message: "Updated reply!" });
  } catch (error) {
    res.status(500).json({ message: `Error : ${error.message}` });
  }
};

module.exports.deleteReply = async (req, res) => {
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

    if (req.user.username != replyInfo.createdByUsername) {
      return res.status(400).json({ message: "This is not your reply!" });
    }

    const reply = await prisma.reply.delete({ where: { id: replyId } });

    if (!reply) {
      return res.status(400).json({ message: "Can't delete reply forum!" });
    }

    const childReplies = await prisma.reply.deleteMany({
      where: { replyId },
    });

    if (!childReplies) {
      return res.status(400).json({ message: "Can't delete child replies!" });
    }

    res.status(200).json({ message: "Deleted reply!" });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};
