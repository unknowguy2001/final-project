const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth");

dotenv.config();
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

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
