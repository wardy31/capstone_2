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

const startNow = async () => {
  const referenceDescriptors = await fs.readFileSync(
    "./descriptors/descriptors.json",
    "utf-8"
  );

  return Promise.all(
    JSON.parse(referenceDescriptors).map(async (label) => {
      const iterate = [];
      for (const iterator of label.descriptors) {
        iterate.push(new Float32Array(iterator));
      }
      return new faceapi.LabeledFaceDescriptors(label.label, iterate);
    })
  );
};
const predict = (req, res) => {
  (async () => {
    await load();
    const { Canvas, Image, ImageData } = canvas;
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

    const img = await canvas.loadImage(
      `./station_faces/${req.params.station_id}/image.jpg`
    );
    const result = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();

    const labeledImages = await startNow();

    const loadMatch = new faceapi.FaceMatcher(labeledImages);
    console.log(result);
    if (result) {
      const match = loadMatch.findBestMatch(result.descriptor);
      console.log("none", match._label);
      try {
        const response = await axios.get(
          `${process.env.BE_HOST}/check-user/${req.params.station_id}/${match._label}`
        );
        console.log(response.data);
        res.json(response.data);
        return;
      } catch (error) {
        console.log(error);
        res.status(400).json(error);
        return;
      }
    }
    res.status(499).json({ message: "No Face Detected" });
  })();
};

module.exports = predict;
