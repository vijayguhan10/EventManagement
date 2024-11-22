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
  iqac: {
    required: true,
    type: String,
  },
  resourceperson: {
    required: true,
    type: [{ type: mongoose.Schema.Types.Mixed }],
  },
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
      "otherspecification",
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
    default: "",
    type: String,
  },
  year: {
    required: true,
    type: String,
  },
  designed: {
    type: Boolean,
    default: false,
  },
  designstatus: {
    type: String,
    enum: ["Yet to Complete", "In Progress", "Completed"],
    default: "Yet to Complete",
  },
  students: { type: Boolean, default: false }, 
  teachers: { type: Boolean, default: false }, 
  alumnis: { type: Boolean, default: false },
  staff:{type:Boolean,default:false},
  schoolstudents:{type:Boolean,default:false},
  outsideparticipants:{type:Boolean,default:false},
  organizer: {
    type: [{ type: mongoose.Schema.Types.Mixed }],
  },
  logos: {
    type: [String],
  },
  international: {
    type: [String],
  },
});

const EventData = mongoose.model("EventData", EventDataSchema);

module.exports = EventData;
