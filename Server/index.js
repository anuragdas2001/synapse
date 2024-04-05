const express = require("express");
const cors = require("cors");

const app = express();
const routes = require("./routes");
const port = 8000;
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
