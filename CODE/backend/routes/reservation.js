const express = require("express");
const router = express.Router();

//controllers
const { createReservation } = require("../controllers/reservation");

// middleware
const { isAuthenticated } = require("../middleware/auth");
const { getUserById } = require("../middleware/user");

//params :
router.param("userId", getUserById);

//Requests
router.post("/booking/create/:userId", isAuthenticated, createReservation);

module.exports = router;
