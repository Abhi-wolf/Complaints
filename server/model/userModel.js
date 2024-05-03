const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    validator: [validator.isEmail, "proper email is required"],
  },
  phone: {
    type: String,
    required: [true, "phone no is required"],
    minLength: [13, "minLength of phone is 13"],
    maxLength: [13, "phone must be 13 digit"],
  },
  password: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  OTP: {
    type: Number,
    default: null,
    minLength: [6, "Minimum Length of OTP is 6"],
    maxLength: [6, "Maximum Length of OTP is 6"],
  },
  OTPExpires: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("user", userSchema);
