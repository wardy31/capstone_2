const faceapi = require("face-api.js");
const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const canvas = require("canvas");
const { rsqrt } = require("@tensorflow/tfjs-core");

const loadModels = async () => {
  console.log("Loading Model...");
  await faceapi.nets.ssdMobilenetv1.loadFromDisk("./weights");
  await faceapi.nets.tinyFaceDetector.loadFromDisk("./weights");
  await faceapi.nets.faceRecognitionNet.loadFromDisk("./weights");
  await faceapi.nets.faceLandmark68Net.loadFromDisk("./weights");
  console.log("Load Completed");
};

const loadImages = async () => {
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

const predict = (stationId) => {
  return new Promise(async (resolve, reject) => {
    // await loadModels();

    const { Canvas, Image, ImageData } = canvas;
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

    const img = await canvas.loadImage(
      `./station_faces/${stationId}/image.jpg`
    );

    const result = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();

    const labeledImages = await loadImages();

    const loadMatch = new faceapi.FaceMatcher(labeledImages);

    if (result) {
      const match = loadMatch.findBestMatch(result.descriptor);
      console.log("Face Result:", match);
      resolve(match._label);
    } else {
      reject({
        message: "No Face Detected",
        status: 2,
      });
    }
  });
};

const checkFaces = (filename) =>
  new Promise(async (resolve, reject) => {
    const { Canvas, Image, ImageData } = canvas;
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

    const img = await canvas.loadImage(`./uploads/${filename}`);

    const result = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (result) {
      resolve(true);
    } else {
      reject(false);
    }
  });

const createDescriptors = (files, userId) =>
  new Promise(async (resolve, reject) => {
    const { Canvas, Image, ImageData } = canvas;
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

    console.log("files",JSON.stringify(files));
    const labeledDescriptors = [];
    for (const key in files) {
      const ref = await canvas.loadImage(`./${files[key][0]["path"]}`);
      const face = await faceapi
        .detectSingleFace(ref)
        .withFaceLandmarks()
        .withFaceDescriptor();
      labeledDescriptors.push(face.descriptor);
    }

    fs.readFile("./descriptors/descriptors.json", "utf8", (err, data) => {
      if (err) {
        return res.status(400).send(err);
      }
      const jsonData = JSON.parse(data);
      jsonData.push(
        new faceapi.LabeledFaceDescriptors(
          userId.toString(),
          labeledDescriptors
        )
      );
      const updatedJsonData = JSON.stringify(jsonData, null, 2);
      fs.writeFile(
        "./descriptors/descriptors.json",
        updatedJsonData,
        "utf8",
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            reject("Error Update");
          } else {
            console.log("Data added to JSON file successfully!");
            resolve("Data Updated");
          }
        }
      );
    });
  });

module.exports = {
  createDescriptors,
  predict,
  loadImages,
  loadModels,
  checkFaces,
};
