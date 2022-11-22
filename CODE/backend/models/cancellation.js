const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cancellationSchema = new mongoose.Schema({
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
  reason: {
    type: String,
  },
});

module.exports = mongoose.model("cancellation", cancellationSchema);
