const socketIo = require("socket.io");
function socketConfig(server, options) {
  const io = socketIo(server, options);
  // Configure Socket.io here
  //   io.emit("hello");
  console.log("Inside SocketJS");
  io.on("connection", (socket) => {
    console.log("New Connection Established:", socket.id);

    // Handle other events here
    socket.emit("hello", "world")
    socket.on("msg",(data)=>{
        console.log("Received from client",data)
    })

    socket.on("editor-change",(textvalue)=>{
      io.emit("reflect",textvalue)
    })
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
  return io;
}

module.exports = socketConfig;
