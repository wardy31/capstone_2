const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const app = express();
const multer = require("multer");
const predictRoute = require("./routes/PredictRoute");
const axios = require('axios')
const fs = require("fs");

const { createServer } = require('http')
const { Server } = require("socket.io");


const corsOptions = {
  origin: ['http://192.168.1.136:8080'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", predictRoute);

// Websocket
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://192.168.1.136:8080"],
    credentials: true
  }
});

io.on('connection', async (socket) => {
  socket.on('clinic-server', (args,callback) => {
    io.emit('clinic-notify', { 'message': "clnic" })
    callback({
      status:"ok"
    })
    console.log('clinic',args)
  })

  socket.on('user-server', (args) => {
    // socket.emit('user-notify', { 'message': "user" })
    console.log('user',args)
  })
})

const images = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (!fs.existsSync(`gg/${req.body.first_name}`)) {
        fs.mkdirSync(`gg/${req.body.first_name}`);
      }
      cb(null, `gg/${req.body.first_name}`);
    },
    filename: function (req, file, cb) {
      console.log("body", req.body.first_name);
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
app.post("/ge", images(), (req, res) => {
  req.files;
  console.log(req.files);
  res.json({ data: req.files, body: req.body });
});

app.get("/checking", async (req, res) => {
  axios.get('http://192.168.1.136:8000/api/check').then((result) => {
    console.log(result.data);
    res.json({ message: result.data, host: req.host })
  }).catch((err) => {
    console.log(err);
  });
  // console.log(req.files);
});

PORT = process.env.PORT || 3000;
console.log(`Running server at http://localhost:${PORT}`);
// app.listen(PORT);

// app.listen(3000, "192.168.1.136", () => {
//   console.log("running server at http://192.168.1.136:3000");
// });

httpServer.listen(3000, "192.168.1.136", () => {
  console.log("running server at http://192.168.1.136:3000");
});