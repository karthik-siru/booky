const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const facilityfcTypeSchema = new mongoose.Schema({
  fctype: {
    type: ObjectId,
    ref: "fcType",
  },
  status: {
    type: String,
    default: "Working",
    enum: ["Working", "Blocked", "Repair"],
  },
});

const facilityfcType = mongoose.model("facilityfcType", facilityfcTypeSchema);

const facilitySchema = new mongoose.Schema({
  name: { type: String, unique: true },
  facilities: {
    type: [facilityfcTypeSchema],
    default: [],
  },
  description: {
    type: String,
    default: "A Facility at NIT Calicut",
  },
  location: {
    type: String,
    default: "In NITC",
  },
});

const facility = mongoose.model("facility", facilitySchema);

module.exports = { facility, facilityfcType };
