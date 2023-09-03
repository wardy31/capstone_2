const faceapi = require("face-api.js");
// const tf = require("@tensorflow/tfjs-node");
const canvas = require("canvas");
const fs = require("fs");

const load = async () => {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk("./weights");
  await faceapi.nets.tinyFaceDetector.loadFromDisk("./weights");
  await faceapi.nets.faceRecognitionNet.loadFromDisk("./weights");
  await faceapi.nets.faceLandmark68Net.loadFromDisk("./weights");
};

const loadImages = async () => {
  const { Canvas, Image, ImageData } = canvas;
  await faceapi.env.monkeyPatch({ Canvas, Image, ImageData });
  await load();

  const length = await fs.readdirSync("./images/");
  return Promise.all(
    length.map(async (label) => {
      const length = await fs.readdirSync(`./images/${label}`).length;
      const descriptions = [];
      for (let i = 1; i <= length; i++) {
        const ref = await canvas.loadImage(`./images/${label}/upload_${i}.jpg`);
        const face = await faceapi
          .detectSingleFace(ref)
          .withFaceLandmarks()
          .withFaceDescriptor();

        descriptions.push(face.descriptor);
      }

      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
};

const loadDescriptor = (req, res, next) => {
  console.log("next");
  (async () => {
    try {
      await fs.readFile(
        "./descriptors/descriptors.json",
        "utf8",
        (err, jsonString) => {
          if (err) {
            res.status.json({message:"something wrong on json file. it might have been deleted"})
            return;
          }
          try {
            (async () => {
              const image = await loadImages()
              await fs.writeFileSync( "./descriptors/descriptors.json",JSON.stringify(image,null,2))
              console.log("image", image);
              res.json({ image: image });
            })();
          } catch (err) {
            console.log("Error parsing JSON string:", err);
            res.status.json({message:"error on json file."})
          }
        }
      );
    } catch (e) {
        res.status.json({message:"On Loading"})
    }
  })();
};

module.exports = loadDescriptor;
