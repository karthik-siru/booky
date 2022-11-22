const cancellation = require("../models/cancellation");
const occupiedfc = require("../models/occupiedfc");

exports.getfcBookings = (req, res) => {
  if (req.bookings) {
    res.status(200).json(req.bookings);
  } else {
    res.status(200).json({
      err: "No bookings found",
    });
  }
};
exports.getUserBookings = (req, res) => {
  if (req.bookings) {
    res.status(200).json(req.bookings);
  } else {
    res.status(200).json({
      err: "No Bookings found",
    });
  }
};
exports.getResBookings = (req, res) => {
  if (req.bookings) {
    res.status(200).json(req.bookings);
  } else {
    res.status(200).json({
      err: "No Bookings found",
    });
  }
};

exports.createBooking = async (req, res) => {
  const { facilityFctypeId, facilityId, userId, resId, timeIn, timeOut } = req;
  try {
    const newBooking = await occupiedfc.create({
      facilityfcType: facilityFctypeId,
      facility: facilityId,
      user: userId,
      reservation: resId,
      timeIn: timeIn,
      timeOut: timeOut,
    });
    res.status(200).json(newBooking);
  } catch {
    res.status(401).json({
      err: "Unable to Create Booking",
    });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = req.booking;
    const { facility, reservation, user } = booking;
    const reason = req.body.reason;

    occupiedfc.findByIdAndDelete(booking._id, (err, doc) => {
      if (err) {
        res.status(401).json({
          err: "Error in booking cancellation",
        });
      }
    });
    const cancelBooking = await cancellation.create({
      facility: facility,
      reservation: reservation,
      user: user,
      reason: reason,
    });
    res.status(200).json({
      deleted: booking,
      cancelBooking: cancelBooking,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json({
      err: "Unable to cancel booking catch ",
    });
  }
};
