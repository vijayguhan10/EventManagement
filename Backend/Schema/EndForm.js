const mongoose = require("mongoose");

const EndformSchema = new mongoose.Schema({
  eventdata: {
    type: String,
  },
  iqacno: {
    type: String,
  },
  transportform: {
    type: [String],
  },
  amenityform: {
    type: String,
  },
  guestform: {
    type: String,
  },
  transportStatus: {
    type: String,
    enum: ["Pending", "Rejected", "Approved", "Corrections"],
    default: "Pending",
  },
  amenityStatus: {
    type: String,
    enum: ["Pending", "Rejected", "Approved", "Corrections"],
    default: "Pending",
  },
  guestStatus: {
    type: String,
    enum: ["Pending", "Rejected", "Approved", "Corrections"],
    default: "Pending",
  },
  status: {
    type: String,
    enum: ["Pending", "Rejected", "Approved", "Corrections"],
    default: "Pending",
  },
 
});
const Endform = mongoose.model("Endform", EndformSchema);
module.exports = Endform;
