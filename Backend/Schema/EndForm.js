const mongoose = require("mongoose");

const EndformSchema = new mongoose.Schema({
  eventdata: {
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
});

const Endform = mongoose.model("Endform", EndformSchema);

module.exports = Endform;
