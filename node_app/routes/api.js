const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const {
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
  getFace,
  getCloseContact,
  createUserAsInfectedUser,
  getInfectedUserbyUserId,
  createContactUser,
  getContactsByInfectedUserId,
  getNotifications,
} = require("../controllers/UsersController");
const {
  getDisease,
  createDisease,
  updateDisease,
  deleteDisease,
} = require("../controllers/DiseaseController");
const {
  getStations,
  createStation,
  updateStations,
  deleteStation,
  loginStation,
  getLocationHistoriesByStationId,
} = require("../controllers/StationsController");
const {
  getLocations,
  createUserLocation,
} = require("../controllers/LocationController");
const {
  getResponses,
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getResponseByUserId,
  createResponse,
} = require("../controllers/QuestionController");
const { userImage, predictImage } = require("../utils/uploadImage");
const { loadModels } = require("../utils/faceRecognition");
const { sockets } = require("../utils/sockets");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const images = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `image`);
    },
    filename: function (req, file, cb) {
      // cb(null, file.fieldname + "-" + uniqueSuffix);
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  });
  const upload = multer({ storage: storage });

  return upload.fields([
    { name: "upload1", maxCount: 1 },
    { name: "upload2", maxCount: 1 },
  ]);
};

router.use(bodyParser.json());

router.get("/load-models", async (req, res) => {
  await loadModels();
  res.send("Load Completed");
});

router.get("/auth-user", authUser);
router.post("/login", loginUser);
router.post("/login-station", loginStation);
router.post("/create-user", images(), createUser);

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.get("/users/:id/location-histories", getUserHistoriesById);
router.get("/users/:id/responses", getResponseByUserId);
router.post("/users/:id/responses", createResponse);
router.get("/users/:id/exposed-users", getExposedUserByInfectedId);

router.get("/infected-users", getInfectedUsers);
router.get("/infected-users/:userId", getInfectedUserbyUserId);
router.get("/infected-users/:infectedId/contacts", getContactsByInfectedUserId);
router.post("/infected-users", createInfectedUsers);
router.post("/infected-users/:infectedId/users", createContactUser);
router.put("/infected-users/:id", updateInfectedUser);
router.delete("/infected-users/:id", deleteInfectedUser);

router.post("/exposed-users", createExposedUsers);
router.put("/exposed-users/:id", updateExposedUserById);
router.delete("/exposed-users/:id", deleteExposedUserById);

router.get("/location-histories", getLocations);
router.post("/location-histories", predictImage(), createUserLocation);

router.get("/diseases", getDisease);
router.post("/diseases", createDisease);
router.put("/diseases/:id", updateDisease);
router.delete("/diseases/:id", deleteDisease);

router.get("/stations", getStations);
router.get("/stations/:id/location-histories", getLocationHistoriesByStationId);
router.post("/stations", createStation);
router.put("/stations/:id", updateStations);
router.delete("/stations/:id", deleteStation);

router.get("/responses", getResponses);
router.get("/questions", getQuestions);
router.post("/questions", createQuestion);
router.put("/questions/:id", updateQuestion);
router.delete("/questions/:id", deleteQuestion);

router.get("/users/:id/trace-contacts", getCloseContact);
router.get("/notifications", getNotifications);

router.get("/check", async (req, res) => {
  sockets().emit("clinic", { message: "Clinic Notify" });

  console.log(sockets());
  res.json("Tesst Sockect");
});

router.post("/scan-face", upload.single("face"), getFace);

module.exports = router;
