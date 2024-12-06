const mongoose = require("mongoose");

const FoodDetailsSchema = new mongoose.Schema({
  Breakfast: {
    guest: {
      Veg: { type: String, default: "" },
      NonVeg: { type: String, default: "" },
    },
    participants: {
      Veg: { type: String, default: "" },
      NonVeg: { type: String, default: "" },
    },
  },
  Lunch: {
    guest: {
      Veg: { type: String, default: "" },
      NonVeg: { type: String, default: "" },
    },
    participants: {
      Veg: { type: String, default: "" },
      NonVeg: { type: String, default: "" },
    },
  },
  Dinner: {
    guest: {
      Veg: { type: String, default: "" },
      NonVeg: { type: String, default: "" },
    },
    participants: {
      Veg: { type: String, default: "" },
      NonVeg: { type: String, default: "" },
    },
  },
  MorningRefreshment: {
    participants: {
      total: { type: String, default: "" },
    },
  },
  EveningRefreshment: {
    guest: {
      total: { type: String, default: "" },
    },
    participants: {
      total: { type: String, default: "" },
    },
  },
});

const EventSchema = new mongoose.Schema(
  {
    eventName: { type: String, required: true },
    eventType: { type: String, required: true },
    otherEventType: { type: String, default: "" },
    iqacNumber: { type: String, required: true },
    empId: { type: String, required: true },
    requestorName: { type: String, required: true },
    requisitionDate: { type: Date, required: true },
    mobileNumber: { type: String, required: true },
    department: { type: String, required: true },
    designationDepartment: { type: String, required: true },
    amenitiesIncharge: { type: String, required: true },
    deanClearance: { type: String, default: "" },
    recommendedBy: { type: String, default: "" },
    facultySignature: { type: String, default: "" },
    dates: {
      type: Map,
      of: FoodDetailsSchema,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
