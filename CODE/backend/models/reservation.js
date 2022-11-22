const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const reservationfcTypeSchema = new mongoose.Schema({
  facilityfcType: {
    type: ObjectId,
    ref: "facilityfcType",
  },
  facility: {
    type: ObjectId,
    ref: "facility",
  },
});

const reservationfcType = mongoose.model(
  "reservationfcType",
  reservationfcTypeSchema
);

const reservationSchema = new mongoose.Schema({
  facilityfctypes: {
    type: [reservationfcTypeSchema],
    default: [],
  },
  timeIn: {
    type: Date,
  },
  timeOut: {
    type: Date,
  },
  user: {
    type: ObjectId,
    ref: "user",
  },
});

const reservation = mongoose.model("reservation", reservationSchema);

module.exports = { reservation, reservationfcType };
