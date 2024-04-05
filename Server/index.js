const express = require("express");
const cors = require("cors");
const socketConfig = require("./Config/socket");
const app = express();
const routes = require("./routes");
const port = 8000;
app.use("/", routes);
const httpServer = require("http").createServer(app);
const socPort = 5000;
const options = {
  cors: {
    origin: "*",
  },
};
const io = socketConfig(httpServer, options);
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);

  httpServer.listen(socPort, () => {
    console.log(`Socket is listening on port ${socPort}`);
   
  });
});
