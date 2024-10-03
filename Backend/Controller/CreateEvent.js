const Signups = require("../Schema/Authorization");
const Event = require("../Schema/EventSchema");

exports.CreateEvent = async (req, res) => {
  const {
    userid,
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

  try {
    const Check_Type_User = await Signups.findById(userid);
    console.log("checking user for creating an event : ", Check_Type_User);
    if (!Check_Type_User) {
      return res.status(401).json({ message: "Oops Invalid User" });
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
    console.error(error);
    return res.status(500).json({
      message: "Sorry, there was an error processing your request.",
      error: error.message,
    });
  }
};

exports.updateevent = async (req, res) => {
  const {
    eventId,
    userid,
    eventname,
    resourceperson,
    organizer,
    venue,
    eventstarttime,
    eventendtime,
    eventstartdate,
    eventenddate,
  } = req.body;

  try {
    const Check_Type_User = await Signups.findById(userid);
    if (!Check_Type_User) {
      return res.status(401).json({ message: "Oops Invalid User" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, {
      userid,
      eventname,
      resourceperson,
      organizer,
      venue,
      eventstarttime,
      eventendtime,
      eventstartdate,
      eventenddate,
    });

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
  const { userid, eventid } = req.body;

  try {
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
    return res.status(500).json({
      message: "Sorry, error in deleting the event",
      error: error.message,
    });
  }
};
exports.Get_Detailed_Info = async (req, res) => {
  const { id } = req.params; 

  try {
    const check_Event_Data = await Event.findById(id);

    if (!check_Event_Data) {
      return res.status(404).json({ message: "Event not found" }); // Use 404 for not found
    }
    return res.status(200).json({
      message: "Data fetched successfully",
      eventdata: check_Event_Data,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Sorry, error in fetching the event", 
      error: err.message,
    });
  }
};

