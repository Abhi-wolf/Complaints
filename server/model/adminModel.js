const mongoose = require("mongoose");
const validator = require("validator");
const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validator: [validator.isEmail, "valid email required"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      maxLength: [10, "maximum 10 length required"],
      minLength: [10, "minimum 10 length required"],
      required: true,
    },
    idProof: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      validator: [validator.isAlphanumeric, "must contains alphabets,numeric"],
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("admin", adminSchema);
