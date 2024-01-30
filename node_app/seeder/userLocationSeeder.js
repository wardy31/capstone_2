const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");

const userLocationSeeder = async () => {
  try {
    const result = await prisma.userLocationHistory.createMany({
      data: [
        {
          userId: 3,
          stationId: 2,
          createdAt: moment(
            "2024-1-17 2:30:42",
            "YYYY-MM-DD HH:mm:ss"
          ).toISOString(),
        },
        {
          userId: 4,
          stationId: 2,
          createdAt: moment(
            "2024-1-24 3:30:42",
            "YYYY-MM-DD HH:mm:ss"
          ).toISOString(),
        },
        {
          userId: 5,
          stationId: 2,
          createdAt: moment(
            "2024-1-25 2:30:42",
            "YYYY-MM-DD HH:mm:ss"
          ).toISOString(),
        },
        {
          userId: 6,
          stationId: 2,
          createdAt: moment(
            "2024-1-18 4:30:42",
            "YYYY-MM-DD HH:mm:ss"
          ).toISOString(),
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }

  console.log("Success");
};

module.exports = userLocationSeeder;
