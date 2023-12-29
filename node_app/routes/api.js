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
} = require("../controllers/QuestionController");
const { userImage, predictImage } = require("../utils/uploadImage");
const { loadModels } = require("../utils/faceRecognition");
const { sockets } = require("../utils/sockets");
router.use(bodyParser.json());

router.get("/load-models", async (req, res) => {
  await loadModels();
  res.send("Load Completed");
});

router.get("auth-user", authUser);
router.post("/login", loginUser);
router.post("/login-station", loginStation);
router.post("/create-user", createUser);

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.get("/users/:id/location-histories", getUserHistoriesById);
router.get("/users/:id/responses", getResponseByUserId);
router.get("/users/:id/exposed-users", getExposedUserByInfectedId);

router.get("/infected-users", getInfectedUsers);
router.post("/infected-users", createInfectedUsers);
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
router.get("questions", getQuestions);
router.post("questions", createQuestion);
router.put("questions/:id", updateQuestion);
router.delete("questions/:id", deleteQuestion);

router.get('/users/:id/trace-contacts',)

router.get("/check", (req, res) => {
  sockets().emit("clinic-contact", { message: "clnic" });
  console.log(sockets());
  res.json(sockets);
});

module.exports = router;
