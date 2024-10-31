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
    type: [{ type: mongoose.Schema.Types.Mixed }],
  },

  // organizer: {
  //   required: true,
  //   type: String,
  // },
  venue: {
    required: true,
    type: String,
  },
  departments: {
    type: [String],
    enum: [
      "Computer and Communication Engineering",
      "Computer Science Engineering",
      "Artificial Intelligence and Data Science",
      "Electronics and Communication Engineering",
      "Information Technology",
      "Mechanical Engineering",
      "Artificial Intelligence and Machine Learning",
      "Computer Science and Business Systems",
      "Electrical and Electronics Engineering",
      "Cybersecurity",
      "All",
    ],
  },
  departmentspecification: {
    type: [String],
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
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "decline"],
    required: true,
  },
  imageurl: {
    type: String,
  },
  eventDescription: {
    type: String,
    required: true,
  },
  year: {
    required: true,
    type: String,
  },
});

const EventData = mongoose.model("EventData", EventDataSchema);

module.exports = EventData;
