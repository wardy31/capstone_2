const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const multer = require("multer");
const predictRoute = require("./routes/PredictRoute");
const axios = require("axios");
const fs = require("fs");
const api = require("./routes/api");
require("dotenv").config();

const { socketServer, httpServer } = require("./utils/sockets");

const corsOptions = {
  origin: [
    "http://192.168.1.136:8080",
    "http://localhost:8080",
    "https://lnucontacttracing.online",
    "http://lnucontacttracing.online",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((res, req, next) => {
  console.log("Date Log:", Date.now());
  next();
});

app.use("/api", predictRoute);
app.use("/api/v2", api);

// Websocket
const server = httpServer(app);
const io = socketServer(server);

io.on("connection", async (socket) => {
  console.log("SOCKET CONNECTED");

  socket.on("clinic-server", (args, callback) => {
    io.emit("clinic-notify", { message: "clnic" });
    callback({
      status: "ok",
    });
    console.log("clinic", args);
  });

  socket.on("user-server", (args) => {
    // socket.emit('user-notify', { 'message': "user" })
    console.log("user", args);
  });
});

app.get("/download-app", (req, res) => {
  res.download("application/app.apk", "data.json", (err) => {
    console.log("err", err);
  });
});

app.get("/checking", async (req, res) => {
  io.emit("clinic-contact", { message: "clnic" });
  res.json({ message: "Testing NODE REST API" });
  // console.log(req.files);
});

app.get("/contact-notify/:id/:location_id", async (req, res) => {
  const response = await axios.get(
    `${process.env.BE_HOST}/contact-notified/${req.params.id}/${req.params.location_id}`
  );
  await io.emit("clinic-contact", { message: "clnic" });
  console.log("response", response);
  res.json({ message: req.params.id });
});

server.listen(process.env.PORT, process.env.NODE_HOST, () => {
  console.log(
    `running server at http://${process.env.NODE_HOST}:${process.env.PORT}`
  );
});
