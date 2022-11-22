const mongoose = require("mongoose");

const facilityTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
});
module.exports = mongoose.model("fcType", facilityTypeSchema);
