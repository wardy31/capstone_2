const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");
const schema = require("../validations/FormValidation");

const getResponses = async (req, res) => {
  const { date = "" } = req.query;
  let query = {};

  if (date?.length)
    query = {
      ...query,
      createdAt: {
        gte: moment(date).startOf("day").format(),
        lte: moment(date).endOf("day").format(),
      },
    };

  try {
    const result = await prisma.userResponse.findMany({
      where: {
        ...query,
      },
      include: {
        user: true,
        UserAnswer: {
          include: {
            questionnaire: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(moment(date).startOf("day").format());
    console.log(moment(date).endOf("day").format());
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
    const result = await prisma.questionnaire.findMany({
      where: {
        isDeleted: false,
      },
    });

    res.json(result);
  } catch (error) {
    res.sendStatus(400);
  }
};

const createQuestion = async (req, res) => {
  try {
    const { title } = await schema.validateAsync(req.body, {
      abortEarly: false,
    });

    const result = await prisma.questionnaire.create({
      data: {
        title: title,
      },
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const updateQuestion = async (req, res) => {
  try {
    const { title } = await schema.validateAsync(req.body, {
      abortEarly: false,
    });

    const result = await prisma.questionnaire.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        title: title,
      },
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const result = await prisma.questionnaire.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        isDeleted: true,
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
