const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const products = require("./routes/productRoutes");
const users = require("./routes/userRoutes");
const auth = require("./routes/authRoutes");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(
  cors({
    origin:process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json({ limit: "4mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

const printRequest = (req, res, next) => {
  console.log(`${req.method}${req.path}`);
  next();
};

app.use(printRequest);

app.use("/api/", users);
app.use("/api/", auth);
app.use("/api/products", products);

module.exports = app;
