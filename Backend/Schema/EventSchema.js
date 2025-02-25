const mongoose = require("mongoose");

const organizerSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  name: { type: String, required: true },
  designation: { type: String, required: true },
  phone: { type: String, required: true },
});

const resourcePersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  affiliation: { type: String, required: true },
});

const eventSchema = new mongoose.Schema({
  iqacNumber: { type: String, required: true },
  departments: { type: [String] },
  academicdepartment: { type: [String] },
  professional: { type: [String] },
  eventName: { type: String, required: true },
  eventType: { type: String, required: true },
  eventVenue: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  year: { type: String },
  categories: { type: [String], required: true },
  logos: { type: [String], required: true },
  description: { type: String },
  organizers: { type: [organizerSchema] },
  resourcePersons: { type: [resourcePersonSchema], required: true },
  status: {
    type: String,
    enum: ["Pending", "Rejected", "event-completed", "Approved", "Corrections"],
    default: "Pending",
  },
  poster: { type: String },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
