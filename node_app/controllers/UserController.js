const faceapi = require("face-api.js");
const tf = require("@tensorflow/tfjs-node");
const canvas = require("canvas");
const fs = require("fs");

const load = async () => {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk("./weights");
  //   await faceapi.nets.tinyFaceDetector.loadFromDisk("./weights");
  await faceapi.nets.faceLandmark68Net.loadFromDisk("./weights");
  await faceapi.nets.faceRecognitionNet.loadFromDisk("./weights");
};

const createUser = async (req, res) => {
  try {
    await load();
    const { Canvas, Image, ImageData } = canvas;
    faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

    const labeledDescriptors = [];
    for (const key in req.files) {
      const ref = await canvas.loadImage(`./${req.files[key][0]["path"]}`);
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
        new faceapi.LabeledFaceDescriptors(req.params.id, labeledDescriptors)
      );
      const updatedJsonData = JSON.stringify(jsonData, null, 2);
      fs.writeFile(
        "./descriptors/descriptors.json",
        updatedJsonData,
        "utf8",
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            res.sendStatus(400);
          } else {
            console.log("Data added to JSON file successfully!");
            res.sendStatus(200);
          }
        }
      );
    });
  } catch (error) {
    res.sendStatus(400);
  }
};

module.exports = createUser;
