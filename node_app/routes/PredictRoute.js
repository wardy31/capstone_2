const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const axios = require("axios");

const images = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync(`image/${req.params.id}`)) {
        fs.mkdirSync(`image/${req.params.id}`);
      }
      cb(null, `image/${req.params.id}`);
    },
    filename: function (req, file, cb) {
      console.log("body", req.params);
      // cb(null, file.fieldname + "-" + uniqueSuffix);
      cb(null, file.fieldname + ".jpg");
    },
  });
  const upload = multer({ storage: storage });

  return upload.fields([
    { name: "upload_1", maxCount: 1 },
    { name: "upload_2", maxCount: 1 },
  ]);
};

const predictImage = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync(`station_faces/${req.params.station_id}`)) {
        fs.mkdirSync(`station_faces/${req.params.station_id}`);
      }
      cb(null, `station_faces/${req.params.station_id}`);
    },
    filename: function (req, file, cb) {
      console.log("body", req.params);
      // cb(null, file.fieldname + "-" + uniqueSuffix);
      cb(null, file.fieldname + ".jpg");
    },
  });
  const upload = multer({ storage: storage });
  return upload.single("image");
};

// controllers
const CheckImageController = require("../controllers/CheckImageController");
const predictController = require("../controllers/PredictController");
const loadImageController = require("../controllers/LoadImageController");
const createUser = require("../controllers/UserController");

router.post("/profile_1", upload.single("image_1"), CheckImageController);
router.post("/profile_2", upload.single("image_2"), CheckImageController);

router.post("/predict", upload.single("avatar"), predictController);
router.get("/load-images", loadImageController);
router.post("/create-account/:id", images(), createUser);
router.post("/prediction/:station_id", predictImage(), predictController);
router.get("/download", (req, res) => {
  res.download("application/app.apk", "station_app.apk", (err) => {
    console.log("err", err);
  });
});

module.exports = router;
