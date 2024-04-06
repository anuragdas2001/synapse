const socketIo = require("socket.io");

function socketConfig(server, options) {
  const io = socketIo(server, options);

  // Data structure to store user status
  const userStatus = {};

  io.on("connection", (socket) => {
    console.log("New Connection Established:", socket.id);

    // Set user status to online when a new connection is established
    userStatus[socket.id] = "online";
    io.emit("user-status", userStatus);

    // Handle other events here
    socket.emit("hello", "world");
    socket.on("msg", (data) => {
      console.log("Received from client", data);
    });

    socket.on("editor-change", (textvalue) => {
      io.emit("reflect", textvalue);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);

      // Set user status to offline when a user disconnects
      userStatus[socket.id] = "offline";
      io.emit("user-status", userStatus);
    });
  });

  return io;
}

module.exports = socketConfig;
