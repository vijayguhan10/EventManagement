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
  departments: {
    required: true,
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
    enum: ["Placement", "Technical", "Nontechnical"],
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
  year:{
    type:String,
    required:true
  }
});

const EventData = mongoose.model("EventData", EventDataSchema);

module.exports = EventData;
