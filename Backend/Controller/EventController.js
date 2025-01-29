const Event = require("../Schema/EventSchema");
const createEvent = async (req, res) => {
  console.log("Event Requewst form data : ", req.body);
  try {
    const {
      iqacNumber,
      departments,
      academicdepartment,
      professional,
      eventName,
      eventType,
      eventVenue,
      startDate,
      endDate,
      startTime,
      endTime,
      year,
      categories,
      logos,
      description,
      organizers,
      resourcePersons,
    } = req.body;
    console.log("requset boxy : ", req.body);
    const newEvent = new Event({
      iqacNumber,
      departments,
      academicdepartment,
      professional,
      eventName,
      eventType,
      eventVenue,
      startDate,
      endDate,
      startTime,
      endTime,
      year,
      categories,
      logos,
      description,
      organizers,
      resourcePersons,
    });
    await newEvent.save();
    res
      .status(200)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createEvent,
};
