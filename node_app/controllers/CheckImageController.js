const faceapi = require("face-api.js");
const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const canvas = require("canvas");
const multer = require("multer");
const axios = require("axios");
const { rsqrt } = require("@tensorflow/tfjs-core");

const load = async () => {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk("./weights");
  await faceapi.nets.tinyFaceDetector.loadFromDisk("./weights");
  await faceapi.nets.faceRecognitionNet.loadFromDisk("./weights");
  await faceapi.nets.faceLandmark68Net.loadFromDisk("./weights");
  await console.log("loading predections");
};

const predict = async (req, res) => {
  fs.renameSync(
    `uploads/${req.file.filename}`,
    `uploads/${req.file.filename}.jpg`
  );

  const { Canvas, Image, ImageData } = canvas;
  faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

  await load();
  const img = await canvas.loadImage(`./uploads/${req.file.filename}.jpg`);

  const result = await faceapi
    .detectSingleFace(img)
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (result) {
    fs.unlink(`./uploads/${req.file.filename}.jpg`, (err) => {
      if (err) {
        console.error("Error occurred while deleting the file:", err);
        res.status(400).send('erorr')
        return;
      }
      console.log("File deleted successfully.");
    });
    res.send("Face Detected");
  } else {
    res.status(400).send("No Face Detecteds");
  }
};

module.exports = predict;
