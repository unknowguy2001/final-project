const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./swagger.json");

const authRouter = require("./routes/auth");
const companiesRouter = require("./routes/companies");

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
app.use("/companies", companiesRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
