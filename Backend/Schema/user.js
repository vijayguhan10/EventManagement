const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    emailId: { type: String, required: true },
    password: { type: String, default: "sece@123" },
    phoneNumber: { type: String, required: true },
    designation: { type: String, required: false },
    dept: { type: String, required: true },
    empid: { type: String, required: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
