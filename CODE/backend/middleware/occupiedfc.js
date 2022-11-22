const occupiedfc = require("../models/occupiedfc");

exports.getBookingsById = (req, res, next, id) => {
  const time = req.body.timeIn;
  occupiedfc
    .findOne({ facilityfcType: id, timeIn: time })
    .exec((err, occfcFound) => {
      if (err) {
        return res.status(400).json({
          err: "Occupied Fc  not found in DB",
        });
      }
      req.booking = occfcFound;
      next();
    });
};

exports.getBookingsByFcId = (req, res, next, id) => {
  occupiedfc.find({ facilityfcType: id }, (err, result) => {
    if (err) {
      res.status(401).json({
        err: "Unable to get occupancies by fctypes",
      });
    }
    req.bookings = result;
    next();
  });
};

exports.getBookingsByUserId = (req, res, next, id) => {
  occupiedfc.find({ user: id }, (err, result) => {
    if (err) {
      res.send(401).json({
        err: "Unable to get occupancies by user ",
      });
    }
    req.bookings = result;
    next();
  });
};

exports.getBookingsByResId = (req, res, next, id) => {
  occupiedfc.find({ reservation: id }, (err, result) => {
    if (err) {
      res.send(401).json({
        err: "Unable to get occupancies by reservation ",
      });
    }
    req.bookings = result;
    next();
  });
};
