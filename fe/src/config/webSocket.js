import { io } from "socket.io-client";

export const socket = io(process.env.VUE_APP_SOCKET);

// Specific connection base han emit ha server
// socket.on("user-notify", (arg) => {
//   console.log("message", arg);
// });

export const emits = () => {
  socket.emit("clinic-server", "Button", (arg) => {
    console.log(arg);
  });

  return true;
};
