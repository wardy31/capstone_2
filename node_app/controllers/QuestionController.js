const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getResponses = async (req, res) => {
  try {
    const result = await prisma.userResponse.findMany({
      include: {
        user: true,
        disease: true,
        UserAnswer: {
          include: {
            questionnaire: true,
          },
        },
      },
    });

    res.json(result);
  } catch (error) {
    res.sendStatus(400);
  }
};

const getResponseByUserId = async (req, res) => {
  try {
    const result = await prisma.userResponse.findMany({
      where: { userId: parseInt(req.params.id) },
      include: {
        user: true,
        disease: true,
        UserAnswer: {
          include: {
            questionnaire: true,
          },
        },
      },
    });

    res.json(result);
  } catch (error) {
    res.sendStatus(400);
  }
};

const getQuestions = async (req, res) => {
  try {
    const result = await prisma.questionnaire.findMany({});

    res.json(result);
  } catch (error) {
    res.sendStatus(400);
  }
};

const createQuestion = async (req, res) => {
  const { title, subtitles } = req.body;
  try {
    const result = await prisma.questionnaire.create({
      data: {
        tite: title,
        subtitle: subtitles,
      },
    });

    res.json(result);
  } catch (error) {
    res.sendStatus(400);
  }
};

const updateQuestion = async (req, res) => {
  const { title, subtitles } = req.body;
  try {
    const result = await prisma.questionnaire.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        tite: title,
        subtitle: subtitles,
      },
    });

    res.json(result);
  } catch (error) {
    res.sendStatus(400);
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const result = await prisma.questionnaire.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.json(result);
  } catch (error) {
    res.sendStatus(400);
  }
};

module.exports = {
  getResponses,
  getResponseByUserId,
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
