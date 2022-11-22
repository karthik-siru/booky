const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const occupiedfcSchema = new mongoose.Schema({
  facilityfcType: {
    type: ObjectId,
    ref: "facilityfcType",
  },
  facility: {
    type: ObjectId,
    ref: "facility",
  },
  reservation: {
    type: ObjectId,
    ref: "reservation",
  },
  user: {
    type: ObjectId,
    ref: "user",
  },
  timeIn: {
    type: Date,
  },
  timeOut: {
    type: Date,
  },
});

module.exports = mongoose.model("occupiedfc", occupiedfcSchema);
