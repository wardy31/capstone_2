const { PrismaClient } = require("@prisma/client");
const { predict } = require("../utils/faceRecognition");
const moment = require("moment");
const prisma = new PrismaClient();
const { sockets } = require("../utils/sockets");

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
        id: parseInt(userId),
        UserResponse: {
          some: {
            createdAt: {
              gte: startCurrentDay,
              lte: endtCurrentDay,
            },
          },
        },
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
            status: "contact",
          },
        },
        InfectedUser: {
          where: {
            status: "infected",
          },
        },
      },
    });

    console.log("user", users);
    // 1 = no form , 2 = no face
    if (!users) {
      return res.json({
        message: "No Declaration Form",
        status: 1,
      });
    }

    if (users.ExposedUser.length || users.InfectedUser.length) {
      const notification = await prisma.userAlertNotification.create({
        data: {
          userId: parseInt(userId),
          stationId: parseInt(stationId),
          type: "contact",
        },
      });
      sockets().emit("clinic", notification, () => {
        console.log("notified");
      });
    }

    const result = await prisma.userLocationHistory.create({
      data: {
        userId: parseInt(userId),
        stationId: parseInt(stationId),
      },
    });

    return res.send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = { getLocations, createUserLocation };
