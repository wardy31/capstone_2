const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const hash = require("bcrypt");
const prisma = new PrismaClient();
const LoginValidation = require("../validations/LoginValidation");
const CreateUserValidation = require("../validations/CreateUserValidation");

const authUser = async (req, res) => {
  try {
    const { id } = jwt.verify(req.get("authorization"), "token");

    const result = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    res.json(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = await LoginValidation.validateAsync(
      req.body,
      { abortEarly: false }
    );
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(400).send({
        details: [
          {
            message: "User not found",
            path: ["username"],
          },
        ],
      });
    }

    if (!(await hash.compare(password, user.password))) {
      return res.status(400).send({
        details: [
          {
            message: "Incorrect password",
            path: ["password"],
          },
        ],
      });
    }

    const token = jwt.sign(user, "token");

    res.send(token);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const createUser = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      gender,
      role,
      department,
      address,
      vaccineStatus,
      contactNumber,
      email,
      username,
      password,
    } = await CreateUserValidation.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await prisma.user.findMany({});
    return res.json(result);
  } catch (error) {
    return res.sendStatus(400);
  }
};

const getUserById = async (req, res) => {
  try {
    const result = await prisma.user.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
    });
    return res.json(result);
  } catch (error) {
    return res.sendStatus(400);
  }
};

const getUserHistoriesById = async (req, res) => {
  try {
    const result = await prisma.userLocationHistory.findMany({
      where: {
        userId: parseInt(req.params.id),
      },
      include: {
        station: true,
        disease: true,
        user: true,
      },
    });

    res.json(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getInfectedUsers = async (req, res) => {
  try {
    const result = await prisma.infectedUser.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        disease: true,
      },
    });

    res.json(result);
  } catch (error) {
    res.sendStatus(400);
  }
};

const createInfectedUsers = async (req, res) => {
  const { id: userId } = req.body;
  try {
    const { id: diseaseId } = await prisma.disease.findFirst({
      where: { isActive: true },
      select: {
        id: true,
      },
    });

    const result = await prisma.infectedUser.create({
      data: {
        userId: parseInt(userId),
        diseaseId: parseInt(diseaseId),
        duration: 14,
      },
    });

    res.json(result);
  } catch (error) {
    res.sendStatus(400);
  }
};

const updateInfectedUser = async (req, res) => {
  try {
    const result = await prisma.infectedUser.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        ...req.body,
      },
    });

    res.json(result);
  } catch (error) {
    res.sendStatus(400);
  }
};

const deleteInfectedUser = async (req, res) => {
  try {
    const result = await prisma.infectedUser.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.json(result);
  } catch (error) {
    res.sendStatus(400);
  }
};

const getExposedUserByInfectedId = async (req, res) => {
  try {
    const result = await prisma.exposedUser.findMany({
      where: {
        infectedUserId: parseInt(req.params.id),
      },
      include: {
        user: true,
        disease: true,
      },
    });

    res.json(result);
  } catch (error) {
    res.sendStatus(400);
  }
};

const createExposedUsers = async (req, res) => {
  const { userId, exposedUsers } = req.body;
  try {
    const { id: diseaseId } = await prisma.disease.findFirst({
      where: {
        isActive: true,
      },
    });
    let result;
    if (typeof exposedUsers == "number") {
      result = await prisma.exposedUser.create({
        data: {
          userId: exposedUsers,
          infectedUserId: userId,
          diseaseId: diseaseId,
        },
      });
    } else {
      const users = JSON.parse(exposedUsers);
      const mapUsers = users.map((user) => ({
        userId: user,
        infectedUserId: userId,
        diseaseId: diseaseId,
      }));

      result = await prisma.exposedUser.createMany({
        data: mapUsers,
        skipDuplicates: true,
      });
    }
  } catch (error) {
    res.sendStatus(400);
  }
};

const updateExposedUserById = async (req, res) => {
  try {
    const result = await prisma.exposedUser.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        ...req.body,
      },
    });

    res.json(result);
  } catch (error) {
    res.sendStatus(400);
  }
};

const deleteExposedUserById = async (req, res) => {
  try {
    const result = await prisma.exposedUser.delete({
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
  loginUser,
  getUsers,
  createUser,
  getUserHistoriesById,
  authUser,
  getUserById,
  getInfectedUsers,
  createInfectedUsers,
  updateInfectedUser,
  deleteInfectedUser,
  getExposedUserByInfectedId,
  createExposedUsers,
  updateExposedUserById,
  deleteExposedUserById,
};
