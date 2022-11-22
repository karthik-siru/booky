require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

//Middlewares:
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const facilityRoutes = require("./routes/facility");
const fcTypeRoutes = require("./routes/facilityType");
const occfcRoutes = require("./routes/occupiedfc");
const reservationRoutes = require("./routes/reservation");

app.use("/booky", adminRoutes);
app.use("/booky", authRoutes);
app.use("/booky", facilityRoutes);
app.use("/booky", fcTypeRoutes);
app.use("/booky", occfcRoutes);
app.use("/booky", reservationRoutes);

//test
app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello</h1>");
});

module.exports = app;
