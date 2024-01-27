const { PrismaClient } = require("@prisma/client");
const { predict } = require("../utils/faceRecognition");
const moment = require("moment");
const prisma = new PrismaClient();

const getLocations = async (req, res) => {
  const { search = "" } = req.query;
  let queries = {};

  if (search.trim().length) {
    queries = {
      stationId: search,
    };
  }

  try {
    const result = await prisma.userLocationHistory.findMany({
      where: { ...queries },
      include: {
        station: true,
        user: true,
      },
    });

    res.json(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const createUserLocation = async (req, res) => {
  const { stationId } = req.body;
  try {
    const startCurrentDay = moment().startOf("day").toDate();
    const endtCurrentDay = moment().endOf("day").toDate();

    const userId = await predict(stationId);

    const users = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        UserResponse: {
          where: {
            createdAt: {
              gte: startCurrentDay,
              lte: endtCurrentDay,
            },
          },
        },
        ExposedUser: {
          where: {
            isActive: true,
          },
        },
        InfectedUser: {
          where: {
            isActive: true,
          },
        },
      },
    });

    if (exposedUser.length || infectedUser.length) {
      // alert socket inin bubutang
    }

    // 1 = no form , 2 = no face
    if (!checkForm) {
      return res.json({
        message: "No Declaration Form",
        status: 1,
      });
    }

    const result = await prisma.userLocationHistory.create({
      data: {
        userId,
        stationId,
      },
    });

    return res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { getLocations, createUserLocation };
