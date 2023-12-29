const multer = require("multer");
const fs = require("fs");

const userImage = () => {
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
      if (!fs.existsSync(`station_faces/${req.body.stationId}`)) {
        fs.mkdirSync(`station_faces/${req.body.stationId}`);
      }
      console.log("destionation", req.body.stationId);
      cb(null, `station_faces/${req.body.stationId}`);
    },
    filename: function (req, file, cb) {
      console.log("filename", req.body.stationId);
      // cb(null, file.fieldname + "-" + uniqueSuffix);
      cb(null, file.fieldname + ".jpg");
    },
  });
  const upload = multer({ storage: storage });
  return upload.single("image");
};

module.exports = { userImage, predictImage };
