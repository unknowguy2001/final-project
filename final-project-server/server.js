const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const dotenvExpand = require("dotenv-expand");
const cookieParser = require("cookie-parser");

// routers
const authRouter = require("./routes/auth");
const forumsRouter = require("./routes/forums");
const companiesRouter = require("./routes/companies");

// middlewares
const authentication = require("./middlewares/authentication");

const config = dotenv.config();
dotenvExpand.expand(config);

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));
app.use("/auth", authRouter);
app.use("/companies", authentication, companiesRouter);
app.use("/forums", authentication, forumsRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
