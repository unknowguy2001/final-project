const thaiCut = require("thai-cut-slim");

const { prisma } = require("../../../utils/prisma");
const { badWords } = require("../../../constants/bad-words");
const { DEFAULT_PER_PAGE } = require("../../../constants/pagination");

const searchReplies = async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const perPage = Math.max(
    parseInt(req.query.perPage) || DEFAULT_PER_PAGE,
    DEFAULT_PER_PAGE,
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

const createReply = async (req, res) => {
  try {
    const { description } = req.body;
    const { forumId } = req.params;

    const parsedForumId = Number(forumId);
    const replyId = Number(req.query.replyId);

    if (!description) {
      return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
    }

    if (isNaN(parsedForumId)) {
      return res.status(400).json({ message: "Id ควรเป็นตัวเลข" });
    }

    const words = thaiCut.cut(description);

    for (let i = 0; i < words.length; i++) {
      if (badWords.includes(words[i].toLowerCase())) {
        return res.status(400).json({ message: "มีคำหยาบในข้อความ" });
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
      return res.status(400).json({ message: "ไม่สามารถตอบกระทู้ได้" });
    }

    res.status(200).json({ message: "ตอบกระทู้สำเร็จ!" });
  } catch (error) {
    res.status(500).json({ message: `Error : ${error.message}` });
  }
};

const updateReply = async (req, res) => {
  try {
    const { id, forumId } = req.params;
    const parsedReplyId = Number(id);
    const parsedForumId = Number(forumId);

    const description = req.body.description;
    const words = thaiCut.cut(description);

    for (let i = 0; i < words.length; i++) {
      if (badWords.includes(words[i].toLowerCase())) {
        return res.status(400).json({ message: "มีคำหยาบในข้อความ" });
      }
    }

    await prisma.reply.update({
      where: {
        id: parsedReplyId,
        forumId: parsedForumId,
        createdByUsername: req.user.username,
      },
      data: {
        description,
      },
    });

    res.status(200).json({ message: "อัพเดทข้อความสำเร็จ!" });
  } catch (error) {
    res.status(500).json({ message: `Error : ${error.message}` });
  }
};

const deleteReply = async (req, res) => {
  try {
    const { id, forumId } = req.params;
    const replyId = Number(id);

    if (isNaN(replyId) && isNaN(Number(forumId))) {
      return res.status(400).json({ message: "Id ควรเป็นตัวเลข" });
    }

    const replyInfo = await prisma.reply.findUnique({
      where: { id: replyId },
    });

    if (!replyInfo) {
      return res
        .status(400)
        .json({ message: "ไม่พบข้อมูลของ reply ที่ต้องการลบ" });
    }

    if (req.user.username != replyInfo.createdByUsername) {
      return res.status(400).json({ message: "ไม่สามารถลบ reply ของผู้อื่น" });
    }

    const reply = await prisma.reply.delete({ where: { id: replyId } });

    if (!reply) {
      return res.status(400).json({ message: "ไม่สามารถลบ reply ได้" });
    }

    const childReplies = await prisma.reply.deleteMany({
      where: { replyId },
    });

    if (!childReplies) {
      return res
        .status(400)
        .json({ message: "ไม่สามารถลบ reply ลูกของ reply ได้" });
    }

    res.status(200).json({ message: "ลบ reply สำเร็จ!" });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }
};

module.exports = {
  searchReplies,
  createReply,
  updateReply,
  deleteReply,
};
