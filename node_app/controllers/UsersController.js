const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const hash = require("bcrypt");
const fs = require("fs");
const prisma = new PrismaClient();
const LoginValidation = require("../validations/LoginValidation");
const CreateUserValidation = require("../validations/CreateUserValidation");
const {
  checkFaces,
  createDescriptors,
  loadModels,
} = require("../utils/faceRecognition");
const moment = require("moment");
const transporter = require("../utils/mail");

const authUser = async (req, res) => {
  try {
    const { id } = jwt.verify(req.get("authorization"), "token");

    const result = await prisma.user.findFirst({
      where: {
        id: id,
      },
      include: {
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

    res.json(result);
  } catch (error) {
    console.log(error);
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
            context: {
              key: "username",
            },
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
            context: {
              key: "password",
            },
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

    const hashPassword = await hash.hash(password, 10);

    const { id } = await prisma.user.create({
      data: {
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
        password: hashPassword,
      },
    });

    const resultDescriptor = await createDescriptors(req.files, id);

    for (const key in req.files) {
      const fileUpload = req.files[key][0];

      if (!fs.existsSync(`profiles/${id}`)) {
        fs.mkdirSync(`profiles/${id}`, { recursive: true });
        console.log("not Exist");
      }

      fs.rename(
        `${fileUpload.path}`,
        `profiles/${id}/${fileUpload.fieldname}.jpg`,
        (err) => {
          if (err) {
            console.error("Error moving file:", err);
          }

          console.log("success");
        }
      );
    }

    res.send(resultDescriptor);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const getUsers = async (req, res) => {
  const { search = "" } = req.query;
  let queries = {};

  if (search.length) {
    queries = {
      OR: [
        {
          firstName: {
            contains: search,
          },
        },
        {
          lastName: {
            contains: search,
          },
        },
      ],
    };
  }

  try {
    const result = await prisma.user.findMany({
      where: {
        ...queries,
        isClinicStaff: false,
      },
    });
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
      include: {
        ExposedUser: {
          include: {
            infectedUser: {
              include: {
                user: true,
              },
            },
          },
        },
        InfectedUser: true,
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
      orderBy: {
        createdAt: "desc",
      },
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

const getInfectedUsers = async (req, res) => {
  const { status = "", search = "" } = req.query;
  let query = {};

  if (search.length) {
    query = {
      OR: [
        {
          user: {
            firstName: { contains: search },
          },
        },
        {
          user: {
            lastName: { contains: search },
          },
        },
      ],
      ...query,
    };
  }

  if (status.length) {
    query = { ...query, status: status };
  }

  console.log(query);

  try {
    const result = await prisma.infectedUser.findMany({
      where: {
        ...query,
      },
      orderBy: [
        {
          status: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
      include: {
        user: true,
        ExposedUser: {
          include: {
            user: true,
          },
        },
      },
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const getContactsByInfectedUserId = async (req, res) => {
  try {
    const result = await prisma.exposedUser.findMany({
      where: {
        infectedUserId: parseInt(req.params.infectedId),
      },
      orderBy: [
        {
          status: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
      include: {
        user: true,
      },
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const getInfectedUserbyUserId = async (req, res) => {
  try {
    const result = await prisma.infectedUser.findFirst({
      where: {
        id: parseInt(req.params.userId),
      },
      include: {
        user: true,
        ExposedUser: {
          orderBy: [
            {
              status: "asc",
            },
            {
              createdAt: "desc",
            },
          ],
          include: {
            user: true,
          },
        },
      },
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const createInfectedUsers = async (req, res) => {
  const { id: userId, dateInfected } = req.body;
  try {
    const result = await prisma.infectedUser.create({
      data: {
        userId: parseInt(userId),
        dateInfected: dateInfected,
      },
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const updateInfectedUser = async (req, res) => {
  const { status } = req.body;

  try {
    const result = await prisma.infectedUser.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        status,
      },
    });

    res.json(result);
  } catch (error) {
    console.log(error);
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

const createUserAsInfectedUser = async (req, res) => {
  try {
    const result = await prisma.infectedUser.create({
      data: {
        userId: parseInt(req.params.id),
        status: "infected",
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
  const { status } = req.body;
  try {
    const result = await prisma.exposedUser.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        status: status,
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

const traceContacts = async (req, res) => {};

const getCloseContact = async (req, res) => {
  const id = parseInt(req.params.id);
  const { positiveDate, windowDate, stationId = null } = req.query;

  const positiveDateFormat = moment(positiveDate).format();
  const windowDateFormat = moment(windowDate).format();

  console.log("positiveDate", positiveDateFormat);
  console.log("windowDateFormat", windowDateFormat);
  let mergeQuery = {};

  if (stationId) {
    console.log("Station");
    mergeQuery = { ...mergeQuery, stationId: parseInt(stationId) };
  }

  try {
    // get the user visited location
    const getUserVisitedLocation = await prisma.userLocationHistory.findMany({
      where: {
        ...mergeQuery,
        userId: {
          equals: id,
        },
        createdAt: {
          gte: windowDateFormat,
          lte: positiveDateFormat,
        },
      },
      include: {
        station: true,
      },
    });

    const users = await prisma.user.findMany({
      where: {
        id: {
          not: id,
        },
        isClinicStaff: false,
        UserLocationHistory: {
          some: {
            createdAt: {
              gte: windowDateFormat,
              lte: positiveDateFormat,
            },
          },
        },
      },
      include: {
        UserLocationHistory: {
          include: {
            station: true,
          },
        },
      },
    });

    const filterLocationHistoryByDate = (users) => {
      // Filter users and modify UserLocationHistory for each user
      return users.map((user) => {
        // Pwede ghap gamitan hin FOR OF pag incase gusto imodify an value didat sakob it array
        // Filter UserLocationHistory for this user based on location and date
        const filteredHistory = user.UserLocationHistory.filter((history) => {
          // Checkf if infecteed user visited locations was equals on the locaiton and date either same or after the visited location
          const userDateLocation = getUserVisitedLocation.find(
            (f) =>
              history.stationId === f.stationId &&
              moment(history.createdAt).isSameOrAfter(moment(f.createdAt))
          );

          return userDateLocation ? true : false;
        });

        // Return the user with filtered UserLocationHistory
        return {
          ...user,
          UserLocationHistory: filteredHistory,
        };
      });
    };

    console.log(getUserVisitedLocation);
    console.log(users);
    res.json({
      usersContact: filterLocationHistoryByDate(users).filter(
        (f) => f.UserLocationHistory.length
      ),
      userVisit: getUserVisitedLocation,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const createContactUser = async (req, res) => {
  const { id: userId } = req.body;
  try {
    const result = await prisma.exposedUser.create({
      data: {
        infectedUserId: parseInt(req.params.infectedId),
        userId: parseInt(userId),
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(userId),
      },
    });

    const info = await transporter.sendMail({
      from: "'lnucontacttracingonline' lnucontacttracingonline@gmail.com",
      to: user.email,
      subject: `Hi! ${user.firstName} ${user.lastName} you have been identified as a close contact. `,
      text: "You have been identified as a close contact of a confirmed case. Please monitor your health and consider getting tested.",
    });
    console.log("info", info);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getFace = async (req, res) => {
  try {
    const result = await checkFaces(req.file.filename);
    console.log("face:", result);
    res.send(req.file);
  } catch (error) {
    console.log("error", error);
    res.status(400).send(error);
  }
};

const getNotifications = async (req, res) => {
  try {
    const result = await prisma.userAlertNotification.findMany({
      include: {
        station: true,
        user: true,
      },
      orderBy:{
        createdAt:"desc"
      }
    });
    res.json(result);
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getCloseContact,
  getFace,
  traceContacts,
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
  createUserAsInfectedUser,
  getInfectedUserbyUserId,
  createContactUser,
  getContactsByInfectedUserId,
  getNotifications,
};
