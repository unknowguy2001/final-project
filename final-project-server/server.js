const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");

// routers
const authRouter = require("./routes/auth");
const commonRouter = require("./routes/common");
const usersRouter = require("./routes/users");
const forumsRouter = require("./routes/forums");
const companiesRouter = require("./routes/companies");

// middlewares
const { authentication } = require("./middlewares/authentication");
const { authorization } = require("./middlewares/authorization");

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://intern.comsci-rmutp.com"],
  })
);
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/common", authentication, authorization(2), commonRouter);
app.use("/api/v1/users", authentication, authorization(2), usersRouter);
app.use("/api/v1/forums", authentication, forumsRouter);
app.use("/api/v1/companies", authentication, companiesRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
