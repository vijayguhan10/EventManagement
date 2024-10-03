const mongoose = require("mongoose");
const EventDataSchema = new mongoose.Schema({
  userid: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Signups",
  },
  eventname: {
    required: true,
    type: String,
  },
  resourceperson: {
    required: true,
    type: String,
  },
  organizer: {
    required: true,
    type: String,
  },
  venue: {
    required: true,
    type: String,
  },
  eventstarttime: {
    required: true,
    type: String,
  },
  eventendtime: {
    required: true,
    type: String,
  },
  eventstartdate: {
    required: true,
    type: String,
  },
  eventenddate: {
    required: true,
    type: String,
  },
  typeofevent: {
    type: String,
    enum: ["placementoriented", "technical", "nontechnical"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "notcompleted"],
    required: true,
  },
});

const EventData = mongoose.model("EventData", EventDataSchema);

module.exports = EventData;
