const Signups = require("../Schema/Authorization");
const Event = require("../Schema/EventSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.CreateEvent = async (req, res) => {
  const {
    eventname,
    resourceperson,
    organizer,
    venue,
    eventstarttime,
    eventendtime,
    eventstartdate,
    eventenddate,
    typeofevent,
    status,
  } = req.body;

  const token = req.headers["authorization"]?.split(" ")[1];
  console.log("JWT token : ", token);
  console.log("process env token : ", process.env.JWT_SECRET_TOKEN);
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    console.log("decoded token : ", decoded);
    const userid = decoded.userId;
    console.log("Decoded user ID:", userid);

    const Check_Type_User = await Signups.findById(userid);
    console.log("Checking user for creating an event:", Check_Type_User);
    if (!Check_Type_User) {
      return res.status(401).json({ message: "Oops, Invalid User" });
    }

    const formattedEventStartDate = new Date(eventstartdate).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }
    );
    const formattedEventEndDate = new Date(eventenddate).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }
    );

    const New_Event_Registration = new Event({
      userid,
      eventname,
      resourceperson,
      organizer,
      venue,
      eventstarttime,
      eventendtime,
      eventstartdate: formattedEventStartDate,
      eventenddate: formattedEventEndDate,
      status,
      typeofevent,
    });

    await New_Event_Registration.save();
    return res.status(201).json({
      message: "Event created successfully",
      event: New_Event_Registration,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      message: "Sorry, there was an error processing your request.",
      error: error.message,
    });
  }
};

exports.updateevent = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }
  const {
    eventId,
    eventname,
    resourceperson,
    organizer,
    venue,
    eventstarttime,
    eventendtime,
    eventstartdate,
    eventenddate,
    status,
  } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    console.log("decoded token : ", decoded);
    var userid = decoded.userId;
    console.log("Decoded user ID:", userid);
    const Check_Type_User = await Signups.findById(userid);
    if (!Check_Type_User) {
      return res.status(401).json({ message: "Oops Invalid User" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        eventname,
        resourceperson,
        organizer,
        venue,
        eventstarttime,
        eventendtime,
        eventstartdate,
        eventenddate,
        status,
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res
      .status(200)
      .json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Sorry, there was an error processing your request.",
      error: error.message,
    });
  }
};
exports.deleteEvent = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract the token

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  const { eventid } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN); // Verify the token
    const userid = decoded.userId; // Get the user ID from the token
    console.log("Decoded user ID:", userid);

    const Check_Type_User = await Signups.findById(userid);
    if (!Check_Type_User) {
      return res.status(401).json({ message: "Oops Invalid User" });
    }

    const deletedEvent = await Event.findByIdAndDelete(eventid);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res
      .status(200)
      .json({ message: "Event deleted successfully", event: deletedEvent });
  } catch (error) {
    console.error("Error:", error.message); // Log the error for debugging
    return res.status(500).json({
      message: "Sorry, error in deleting the event",
      error: error.message,
    });
  }
};
exports.Get_Detailed_Info = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract the token

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  const { id } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userid = decoded.userId;
    console.log("Decoded user ID:", userid);

    const Check_Type_User = await Signups.findById(userid);
    if (!Check_Type_User) {
      return res.status(401).json({ message: "Oops Invalid User" });
    }

    const check_Event_Data = await Event.findById(id);

    if (!check_Event_Data) {
      return res.status(404).json({ message: "Event not found" }); // Use 404 for not found
    }
    return res.status(200).json({
      message: "Data fetched successfully",
      eventdata: check_Event_Data,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      message: "Sorry, error in fetching the event",
      error: error.message,
    });
  }
};
