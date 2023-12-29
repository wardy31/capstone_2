const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const hash = require("bcrypt");
const schema = require("../validations/StationValidation");

const loginStation = async (req, res) => {
  try {
    const { username, password } = schema.validateAsync(req.body, {
      abortEarly: false,
    });

    const result = await prisma.station.findFirst({
      where: {
        username: username,
      },
    });

    if (!result) {
      return res.status(400).send({
        details: [
          {
            message: "no user was found",
            path: ["username"],
          },
        ],
      });
    }

    if (!(await hash.compare(password, result.password))) {
      return res.status(400).send({
        details: [
          {
            message: "no user was found",
            path: ["username"],
          },
        ],
      });
    }

    const token = jwt.sign(result, "token");

    return res.json({
      data: result,
      token,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const getStations = async (req, res) => {
  let queries = {};

  if (req.query.search.trim().length) {
    queries = {
      name: {
        contains: req.query.search,
      },
    };
  }

  try {
    const result = await prisma.station.findMany({
      where: {
        ...queries,
      },
    });
    return res.json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getLocationHistoriesByStationId = async (req, res) => {
  let queries = {};

  if (req.query.search.trim().length) {
    queries = {
      name: {
        contains: req.query.search,
      },
    };
  }

  try {
    const result = await prisma.userLocationHistory.findMany({
      where: {
        stationId: parseInt(req.params.id),
        ...queries,
      },
      include: {
        user: true,
        disease: true,
        station: true,
      },
    });
    return res.json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const createStation = async (req, res) => {
  try {
    const { name, username, password } = await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    const hashedPassword = await hash.hash(password, 10);

    const result = await prisma.station.create({
      data: {
        name,
        username,
        password: hashedPassword,
      },
    });

    return res.json(result);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(400).send({
          details: [
            {
              message: "station name has been taken",
              path: ["name"],
            },
          ],
        });
      }
    }
    return res.status(400).send(error);
  }
};

const updateStations = async (req, res) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });

    const result = await prisma.station.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        ...req.body,
      },
    });

    return res.json(result);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(400).send({
          details: [
            {
              message: "station name has been taken",
              path: ["name"],
            },
          ],
        });
      }
    }
    return res.status(400).send(error);
  }
};

const deleteStation = async (req, res) => {
  try {
    const result = await prisma.station.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.json(result);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  createStation,
  getStations,
  updateStations,
  deleteStation,
  loginStation,
  getLocationHistoriesByStationId,
};
