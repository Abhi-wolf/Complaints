const mongoose = require("mongoose");
const validator = require("validator");

const complaintSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name is required"],
    },
    fatherName: {
      type: String,
      required: [true, "fatherName is required"],
    },
    email: {
      type: String,
      required: true,
      validator: [validator.isEmail, "enter proper email"],
    },
    phone: {
      type: Number,
      required: [true, "phone no is required"],
      minlength: [10, "Enter min 10 digit number"],
      maxLength: [10, "Enter max 10 digit number"],
    },
    idProofNumber: {
      type: String,
      required: true,
    },
    //id proof image model

    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    //extra file upload
    //written file upload
    //status of complain
    access: {
      type: Boolean,
      default: true, // complain active to delete make false
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    idProofPdf: {
      type: String,
      // required:true,
    },
    writtenComplaint: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "processing",
        "forwarded to relevant department",
        "rejected",
        "solved",
      ],
      default: "processing",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("complaint", complaintSchema);
