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
  communicationform: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Rejected", "Approved", "Corrections"],
    default: "Pending",
  },
  createdat: {
    type: Date,
    default: Date.now(),
  },
});
const Endform = mongoose.model("Endform", EndformSchema);
module.exports = Endform;
