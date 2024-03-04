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
    validator:[validator.isEmail,"proper email is required"]
  },
  phone: {
    type: String,
    required: [true, "phone no is required"],
    minLength:[10,"minLength of phone is 10"],
    maxLength:[10,"phone must be 10 digit"],
  },
  password: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
    unique:true
  },
  role:{
    type:String,
    enum:["admin","user"],
    default:"user"
  }
});

module.exports = mongoose.model("user", userSchema);
