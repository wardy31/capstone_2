const { createServer } = require("node:http");
const { Server } = require("socket.io");

let socks;
const httpServer = (app) => createServer(app);

const socketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [
        "http://192.168.1.107:5173",
        "http://192.168.1.107:8080",
        "http://localhost:8080",
        "https://lnucontacttracing.online",
        "http://localhost:80",
        "http://localhost:5173",
      ],
      credentials: true,
    },
  });
  return (socks = io);
};

const sockets = () => socks;

module.exports = { sockets, socketServer, httpServer };
