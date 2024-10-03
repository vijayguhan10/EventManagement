const mongoose = require("mongoose");
const validator = require("validator");

// Define the Signups schema
const SignupsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String, 
    required: true,
    validate: {
      validator: validator.isEmail, 
      message: "Sorry, please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: validator.isStrongPassword,
      message: "Please ensure that you have entered a strong password",
    },
  },
});

module.exports = mongoose.model("Signups", SignupsSchema);
