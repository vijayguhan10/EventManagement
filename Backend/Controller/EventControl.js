const Event = require("../Schema/EventSchema");
const { validateUser, formatDate } = require("../utilities/EventHelper");
const images_dept = require("../other/Images");
const TotalCount = require("../Schema/TotalCount");
const initializeTotalCount = async () => {
  const count = await TotalCount.findOne({});
  if (!count) {
    const newTotalCount = new TotalCount({
      totalCounts: {
        "Computer and Communication Engineering": 0,
        "Computer Science Engineering": 0,
        "Artificial Intelligence and Data Science": 0,
        "Electronics and Communication Engineering": 0,
        "Information Technology": 0,
        "Mechanical Engineering": 0,
        "Artificial Intelligence and Machine Learning": 0,
        "Computer Science and Business Systems": 0,
        "Electrical and Electronics Engineering": 0,
        Cybersecurity: 0,
      },
    });
    await newTotalCount.save();
    console.log("TotalCount document initialized.");
  }
};

const incrementDepartmentCount = async (departments) => {
  console.log("departments : ", departments);
  if (departments.includes("All")) {
    await TotalCount.updateOne(
      {},
      {
        $inc: {
          "totalCounts.Computer and Communication Engineering": 1,
          "totalCounts.Computer Science Engineering": 1,
          "totalCounts.Artificial Intelligence and Data Science": 1,
          "totalCounts.Electronics and Communication Engineering": 1,
          "totalCounts.Information Technology": 1,
          "totalCounts.Mechanical Engineering": 1,
          "totalCounts.Artificial Intelligence and Machine Learning": 1,
          "totalCounts.Computer Science and Business Systems": 1,
          "totalCounts.Electrical and Electronics Engineering": 1,
          "totalCounts.Cybersecurity": 1,
        },
      }
    );
  } else {
    for (const department of departments) {
      await TotalCount.updateOne(
        {},
        { $inc: { [`totalCounts.${department}`]: 1 } }
      );
    }
  }
};
const updateDepartmentCount = async (oldDepartment, newDepartment) => {
  if (oldDepartment === "All") {
    // Decrement for all departments if the old value was "All"
    await TotalCount.updateOne(
      {},
      {
        $inc: {
          "totalCounts.Computer and Communication Engineering": -1,
          "totalCounts.Computer Science Engineering": -1,
          "totalCounts.Artificial Intelligence and Data Science": -1,
          "totalCounts.Electronics and Communication Engineering": -1,
          "totalCounts.Information Technology": -1,
          "totalCounts.Mechanical Engineering": -1,
          "totalCounts.Artificial Intelligence and Machine Learning": -1,
          "totalCounts.Computer Science and Business Systems": -1,
          "totalCounts.Electrical and Electronics Engineering": -1,
          "totalCounts.Cybersecurity": -1,
        },
      }
    );
  } else if (oldDepartment) {
    await TotalCount.updateOne(
      {},
      { $inc: { [`totalCounts.${oldDepartment}`]: -1 } }
    );
  }

  if (newDepartment === "All") {
    // Increment for all departments if the new value is "All"
    await TotalCount.updateOne(
      {},
      {
        $inc: {
          "totalCounts.Computer and Communication Engineering": 1,
          "totalCounts.Computer Science Engineering": 1,
          "totalCounts.Artificial Intelligence and Data Science": 1,
          "totalCounts.Electronics and Communication Engineering": 1,
          "totalCounts.Information Technology": 1,
          "totalCounts.Mechanical Engineering": 1,
          "totalCounts.Artificial Intelligence and Machine Learning": 1,
          "totalCounts.Computer Science and Business Systems": 1,
          "totalCounts.Electrical and Electronics Engineering": 1,
          "totalCounts.Cybersecurity": 1,
        },
      }
    );
  } else if (newDepartment) {
    await TotalCount.updateOne(
      {},
      { $inc: { [`totalCounts.${newDepartment}`]: 1 } }
    );
  }
};

exports.CreateEvent = async (req, res) => {
  console.log("Request body:", req.body);
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
      departments,
    } = req.body;
    const userId = req.userId;

    const isValidUser = await validateUser(userId);
    if (!isValidUser) {
      return res.status(401).json({ message: "Oops, Invalid User" });
    }

    const createdEvents = [];
    let departmentsToProcess = departments.includes("All")
      ? images_dept.map((item) => item.name)
      : departments;

    for (const department of departmentsToProcess) {
      const departmentData = images_dept.find(
        (item) => item.name === department
      );

      const imageKey = departmentData
        ? Object.keys(departmentData).find((key) => key !== "name")
        : null;

      const imageUrl = imageKey ? departmentData[imageKey] : null;

      const newEvent = new Event({
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
        departments: department,
        imageurl: imageUrl,
      });

      const savedEvent = await newEvent.save();
      console.log("Saved event:", savedEvent);
      createdEvents.push(savedEvent);
    }
    const count = await TotalCount.findOne({});
    if (!count) {
      await initializeTotalCount();
    } else {
      await incrementDepartmentCount(departments);
    }

    const updatedCounts = await TotalCount.find({});
    console.log("Incremented model data:", updatedCounts);

    return res.status(201).json({
      message: "Events created successfully",
      events: createdEvents,
    });
  } catch (error) {
    console.error("Error in CreateEvent:", error.message);
    return res.status(500).json({
      message: "Sorry, there was an error processing your request.",
      error: error.message,
    });
  }
};

exports.updateevent = async (req, res) => {
  console.log("rrrrrrrrrrrrrrrr : ", req.body);
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
      departments,
      typeofevent,
    } = req.body;

    const st_date = formatDate(eventstartdate);
    const end_date = formatDate(eventenddate);

    const userId = req.userId;

    const isValidUser = await validateUser(userId);
    if (!isValidUser) {
      return res.status(401).json({ message: "Oops, Invalid User" });
    }

    const eventToUpdate = await Event.findById(eventId);
    if (!eventToUpdate) {
      return res.status(404).json({ message: "Event not found" });
    }

    const oldDepartment = eventToUpdate.departments;

    let updatedFields = {
      eventname,
      resourceperson,
      organizer,
      venue,
      eventstarttime,
      eventendtime,
      eventstartdate: st_date,
      eventenddate: end_date,
      typeofevent,
    };

    if (departments && departments.length > 0) {
      const departmentName = departments[0];

      const departmentData = images_dept.find(
        (item) => item.name === departmentName
      );

      const imageKey = departmentData
        ? Object.keys(departmentData).find((key) => key !== "name")
        : null;
      const imageUrl = imageKey ? departmentData[imageKey] : null;

      if (imageUrl) {
        updatedFields.imageurl = imageUrl;
      }

      updatedFields.departments = departments;
    }

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedFields, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    await updateDepartmentCount(oldDepartment, departments[0]);

    return res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent,
    });
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

    const updatedEvent = await Event.findByIdAndUpdate(
      eventid,
      { status: 'decline' },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json({
      message: "Event status updated to declined successfully",
      event: updatedEvent
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      message: "Sorry, error in updating the event status",
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
exports.departmentevent = async (req, res) => {
  try {
    const { department } = req.body;
    const userId = req.userId;
    const isValidUser = await validateUser(userId);

    if (!isValidUser) {
      return res.status(401).json({ message: "Oops, Invalid User" });
    }

    console.log(department, "😎 Department received");
    const events = await Event.find({ departments: { $in: department } });

    // Instead of returning 404, return an empty array
    if (!events) {
      return res.status(200).json([]); // Return an empty array
    }

    console.log(events, "Retrieved events");
    return res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching department events: ", err);
    return res.status(500).json({ message: "Server Error" });
  }
};
exports.getTotalCount = async (req, res) => {
  const userid = req.userId;
  const isValidUser = await validateUser(userid);

  if (!isValidUser) {
    return res.status(401).json({ message: "Oops, Invalid User" });
  }

  try {
    const TotalCounts = await TotalCount.find({});
    console.log("Incremented model data:", TotalCounts);
    res.status(200).json({
      message: "Total events passed successfully",
      TotalCountsDept: TotalCounts,
    });
  } catch (error) {
    console.error("Error fetching total counts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
