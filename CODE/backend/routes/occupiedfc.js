const express = require("express");
const router = express.Router();

//controllers
const {
  getfcBookings,
  getUserBookings,
  getResBookings,
  cancelBooking,
} = require("../controllers/occupiedfc");

// middleware
const { isAuthenticated } = require("../middleware/auth");
const {
  getBookingsById,
  getBookingsByFcId,
  getBookingsByResId,
  getBookingsByUserId,
} = require("../middleware/occupiedfc");
const { getUserById } = require("../middleware/user");

//params :
router.param("userId", getUserById);
router.param("fcId", getBookingsByFcId);
router.param("userbookingId", getBookingsByUserId);
router.param("resId", getBookingsByResId);
router.param("bookingId", getBookingsById);

// Requests
router.get("/booking/fc/:fcId", getfcBookings);
router.get("/booking/user/:userbookingId", isAuthenticated, getUserBookings);
router.get("/booking/res/:resId", isAuthenticated, getResBookings);
router.delete(
  "/booking/cancel-booking/:bookingId",
  isAuthenticated,
  cancelBooking
);

module.exports = router;
