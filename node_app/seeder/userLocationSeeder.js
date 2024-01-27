const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");

const userLocationSeeder = async () => {
  try {
    const result = await prisma.userLocationHistory.create({
      data: {
        userId: 2,
        stationId: 1,
        createdAt: moment(
          "2024-1-16 2:30:42",
          "YYYY-MM-DD HH:mm:ss"
        ).toISOString(),
      },
    });
  } catch (error) {
    console.log(error);
  }

  console.log("Success");
};

module.exports = userLocationSeeder;
