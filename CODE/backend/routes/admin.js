const express = require("express");
const router = express.Router();

//middleware
const { isAdmin, isAuthenticated } = require("../middleware/auth");
const { getUserById } = require("../middleware/user");

//controllers
const { getAllCancellations } = require("../utils/cancellations");
const { getAllBookings } = require("../utils/bookings");

//params :
router.param("userId", getUserById);

//Requests
router.get(
  "/admin/cancellations/:userId",
  isAuthenticated,
  isAdmin,
  getAllCancellations
);
router.get("/admin/bookings/:userId", isAuthenticated, isAdmin, getAllBookings);

module.exports = router;
