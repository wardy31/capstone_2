const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

const images = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync(`images/${req.params.id}`)) {
        fs.mkdirSync(`images/${req.params.id}`);
      }
      cb(null, `images/${req.params.id}`);
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
const predictController = require("../controllers/PredictController");
const loadImageController = require("../controllers/LoadImageController");

router.post("/predict", upload.single("avatar"), predictController);
router.get("/load-images", loadImageController);
router.post("/create-account/:id", images(), loadImageController);
router.post("/prediction/:station_id", predictImage(), predictController);
router.get("/download", (req, res) => {
  res.download("descriptors/descriptors.json", "data.json", (err) => {
    console.log("err", err);
  });
});

module.exports = router;
