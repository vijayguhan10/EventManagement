const Event = require("../Schema/EventSchema");
const { validateUser, formatDate } = require("../utilities/EventHelper");

exports.CreateEvent = async (req, res) => {
  try {
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
    const userId = req.userId;

    const isValidUser = await validateUser(userId);
    if (!isValidUser) {
      return res.status(401).json({ message: "Oops, Invalid User" });
    }

    const New_Event_Registration = new Event({
      userid: userId,
      eventname,
      resourceperson,
      organizer,
      venue,
      eventstarttime,
      eventendtime,
      eventstartdate: formatDate(eventstartdate),
      eventenddate: formatDate(eventenddate),
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
  try {
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
    const userId = req.userId;

    const isValidUser = await validateUser(userId);
    if (!isValidUser) {
      return res.status(401).json({ message: "Oops, Invalid User" });
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
        eventstartdate: formatDate(eventstartdate),
        eventenddate: formatDate(eventenddate),
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
  try {
    const { eventid } = req.body;
    const userId = req.userId;

    const isValidUser = await validateUser(userId);
    if (!isValidUser) {
      return res.status(401).json({ message: "Oops, Invalid User" });
    }

    const deletedEvent = await Event.findByIdAndDelete(eventid);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res
      .status(200)
      .json({ message: "Event deleted successfully", event: deletedEvent });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      message: "Sorry, error in deleting the event",
      error: error.message,
    });
  }
};

exports.Get_Detailed_Info = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const isValidUser = await validateUser(userId);
    if (!isValidUser) {
      return res.status(401).json({ message: "Oops, Invalid User" });
    }

    const check_Event_Data = await Event.findById(id);
    if (!check_Event_Data) {
      return res.status(404).json({ message: "Event not found" });
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

exports.getallevents = async (req, res) => {
  try {
    const userId = req.userId;
    const isValidUser = await validateUser(userId);
    if (!isValidUser) {
      return res.status(401).json({ message: "Oops, Invalid User" });
    }

    const todayEvents = await Event.find({});

    if (todayEvents.length === 0) {
      return res
        .status(404)
        .json({ message: "No events scheduled for today." });
    }

    return res.status(200).json({
      message: "Today's events fetched successfully",
      eventdata: todayEvents,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      message: "Sorry, error in fetching the events",
      error: error.message,
    });
  }
};
