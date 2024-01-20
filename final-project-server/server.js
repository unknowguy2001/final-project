const cors = require("cors");
require("dotenv").config();
const express = require("express");

const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost"],
  })
);

app.use(routes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
