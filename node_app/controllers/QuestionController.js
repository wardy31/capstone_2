const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");

const getResponses = async (req, res) => {
  try {
    const result = await prisma.userResponse.findMany({
      include: {
        user: true,
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
  const { hasForm = "" } = req.query;

  let filter = {};

  if (hasForm) {
    const startOfDay = moment().startOf("day").toDate();
    const endOfDay = moment().endOf("day").toDate();

    filter = {
      ...filter,
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    };
  }

  try {
    const result = await prisma.userResponse.findMany({
      where: { ...filter, userId: parseInt(req.params.id) },
      include: {
        user: true,
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
  const { title, subtitle } = req.body;
  try {
    const result = await prisma.questionnaire.create({
      data: {
        title: title,
        subtitle: subtitle,
      },
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const updateQuestion = async (req, res) => {
  const { title, subtitle } = req.body;
  try {
    const result = await prisma.questionnaire.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        title: title,
        subtitle: subtitle,
      },
    });

    res.json(result);
  } catch (error) {

    console.log(error);
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
    console.log(error);
    res.sendStatus(400);
  }
};

const createResponse = async (req, res) => {
  const { id } = req.params;
  const { response } = req.body;
  try {
    const parse = JSON.parse(response);

    const userResponse = await prisma.userResponse.create({
      data: {
        userId: parseInt(id),
        UserAnswer: {
          create: parse,
        },
      },
    });
    res.send(userResponse);
  } catch (error) {
    console.log(error);
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
  createResponse,
};
