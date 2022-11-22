const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter the email"],
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
  role: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("user", userSchema);
