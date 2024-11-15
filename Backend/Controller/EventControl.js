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
        otherspecification: 0,
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
          "totalCounts.otherspecification": 1,
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
const decrementDepartmentCount = async (departments) => {
  console.log("departments : ", departments);

  if (departments.includes("All")) {
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
          "totalCounts.otherspecification": -1,
        },
      }
    );
  } else {
    for (const department of departments) {
      // Decrement the count for each department
      await TotalCount.updateOne(
        {},
        { $inc: { [`totalCounts.${department}`]: -1 } }
      );

      // Ensure the count doesn't go below zero
      const updatedCount = await TotalCount.findOne({});
      const currentCount = updatedCount.totalCounts[department];

      if (currentCount < 0) {
        // If the count is below zero, set it to zero
        await TotalCount.updateOne(
          {},
          { $set: { [`totalCounts.${department}`]: 0 } }
        );
      }
    }
  }
};

const updateDepartmentCount = async (oldDepartment, newDepartment) => {
  if (oldDepartment === "All") {
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
  console.log("REQUEST ACESSED");
  console.log("Request body:", req.body);
  try {
    const {
      iqac,
      eventname,
      resourcePersons,
      departmentspecification,
      eventDescription,
      venue,
      eventstarttime,
      eventendtime,
      eventstartdate,
      eventenddate,
      typeofevent,
      status,
      departments,
      year,
    } = req.body;
    const userId = req.userId;
    console.log("Consoling the form data", req.body);
    console.log("resource persons", resourcePersons);

    const isValidUser = await validateUser(userId);
    if (!isValidUser) {
      return res.status(401).json({ message: "Oops, Invalid User" });
    }

    const resourceperson = Object.entries(resourcePersons || {}).map(
      ([key, value]) => ({ [key]: value })
    );

    let formattedDepartmentspecification;
    if (typeof departmentspecification === "string") {
      try {
        formattedDepartmentspecification = JSON.parse(departmentspecification);
      } catch (error) {
        console.error(
          "Failed to parse departmentspecification as JSON:",
          error
        );
        return res
          .status(400)
          .json({ message: "Invalid departmentspecification format." });
      }
    } else {
      formattedDepartmentspecification = departmentspecification;
    }

    if (!Array.isArray(formattedDepartmentspecification)) {
      return res
        .status(400)
        .json({ message: "departmentspecification must be an array." });
    }

    let departmentsToProcess = [];
    let imageUrl =
      "https://digicult.it/wp-content/uploads/2022/03/earlylife.png"; // Initialize imageUrl here

    if (departments.includes("All")) {
      departmentsToProcess = ["All"];
      imageUrl = "https://i.ibb.co/s3MbZv2/eee.png"; // Change imageUrl when "All" is included
    } else if (!departments.length && formattedDepartmentspecification.length) {
      departmentsToProcess = ["otherspecification"];
    } else {
      departmentsToProcess = departments;
    }

    if (
      departments.includes("All") ||
      departmentsToProcess.includes("otherspecification")
    ) {
      imageUrl = "https://i.ibb.co/s3MbZv2/eee.png"; // Update imageUrl for "All" or "otherspecification"
    } else if (departments.length && departmentsToProcess.length) {
      const departmentData = images_dept.find((item) =>
        departments.includes(item.name)
      );
      imageUrl = departmentData
        ? departmentData[
            Object.keys(departmentData).find((key) => key !== "name")
          ]
        : imageUrl;
    }

    const newEvent = new Event({
      iqac,
      userid: userId,
      eventname,
      resourceperson,
      venue,
      eventstarttime,
      eventendtime,
      eventstartdate: formatDate(eventstartdate),
      eventenddate: formatDate(eventenddate),
      status,
      typeofevent,
      departments: departmentsToProcess,
      imageurl: imageUrl,
      eventDescription,
      departmentspecification: formattedDepartmentspecification,
      year,
    });

    const savedEvent = await newEvent.save();
    console.log("Saved event:", savedEvent);

    const count = await TotalCount.findOne({});
    if (!count) {
      await initializeTotalCount();
    }

    if (departments.includes("All")) {
      const allDepartments = [
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
      ];
      for (const dept of allDepartments) {
        await incrementDepartmentCount([dept]);
      }
      if (departmentspecification.length) {
        await incrementDepartmentCount(["otherspecification"]);
      }
    } else {
      await incrementDepartmentCount(departments);
      if (departmentspecification.length) {
        await incrementDepartmentCount(["otherspecification"]);
      }
    }

    const updatedCounts = await TotalCount.find({});
    console.log("Incremented model data:", updatedCounts);

    return res.status(201).json({
      message: "Event created successfully",
      event: savedEvent,
      year: year,
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
      resourcePersons,
      departmentspecification,
      venue,
      eventstarttime,
      eventendtime,
      eventstartdate,
      eventenddate,
      typeofevent,
      departments,
      year,
      description,
    } = req.body;
    console.log("resour5ce persopnm", resourcePersons);
    console.log("consoling the updaegt", req.body);
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
    console.log(eventToUpdate);
    console.log();
    const oldDepartment = eventToUpdate.departments;
    const oldspecification = eventToUpdate.departmentspecification;
    console.log("😎😎", departments, oldspecification);
    if (oldDepartment.includes("All")) {
      const allDepartments = [
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
      ];
      if (oldspecification.length) {
        console.log("consoled");
        console.log("😤😤😤😤", oldspecification);
        await decrementDepartmentCount(["otherspecification"]);
      }
      for (const dept of allDepartments) {
        await decrementDepartmentCount([dept]);
      }
    } else if (oldspecification || oldDepartment.length) {
      if (oldspecification.length) {
        console.log("consoled");
        console.log("😒😒", oldDepartment);
        await decrementDepartmentCount(["otherspecification"]);
      }
      if (oldDepartment.length) {
        await decrementDepartmentCount(oldDepartment);
      }
    }
    const resourceperson = Object.entries(resourcePersons || {}).map(
      ([key, value]) => ({ [key]: value })
    );
    let formattedDepartmentspecification;
    if (typeof departmentspecification === "string") {
      try {
        formattedDepartmentspecification = JSON.parse(departmentspecification);
      } catch (error) {
        console.error(
          "Failed to parse departmentspecification as JSON:",
          error
        );
        return res
          .status(400)
          .json({ message: "Invalid departmentspecification format." });
      }
    } else {
      formattedDepartmentspecification = departmentspecification;
    }

    if (!Array.isArray(formattedDepartmentspecification)) {
      return res
        .status(400)
        .json({ message: "departmentspecification must be an array." });
    }

    const createdEvents = [];
    let departmentsToProcess = [];

    if (departments.includes("All")) {
      departmentsToProcess = ["All"];
      imageUrl = "https://i.ibb.co/s3MbZv2/eee.png";
    } else if (!departments.length && formattedDepartmentspecification.length) {
      departmentsToProcess = ["otherspecification"];
    } else {
      departmentsToProcess = departments;
    }

    for (const department of departmentsToProcess) {
      if (departments.includes("All") && department === "otherspecification") {
        continue;
      }

      const departmentData =
        department !== "otherspecification"
          ? images_dept.find((item) => item.name === department)
          : null;

      let imageUrl =
        department === "otherspecification"
          ? "https://digicult.it/wp-content/uploads/2022/03/earlylife.png"
          : departmentData
          ? departmentData[
              Object.keys(departmentData).find((key) => key !== "name")
            ]
          : null;
      console.log("image url******", imageUrl);
      if (!imageUrl) {
        imageUrl =
          "https://digicult.it/wp-content/uploads/2022/03/earlylife.png";
      }
    }

    let updatedfield = {
      eventname,
      resourceperson,
      departmentspecification,
      venue,
      eventstarttime,
      eventendtime,
      eventstartdate: st_date,
      eventenddate: end_date,
      typeofevent,
      departments,
      year,
      description,
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedfield, {
      new: true,
    });
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (departments.includes("All")) {
      const allDepartments = [
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
      ];
      if (departmentspecification.length) {
        console.log("consoled");
        console.log(departmentspecification);
        await incrementDepartmentCount(["otherspecification"]);
      }
      for (const dept of allDepartments) {
        await incrementDepartmentCount([dept]);
      }
    } else if (departmentspecification || departments.length) {
      if (departmentspecification.length) {
        console.log("consoled");
        await incrementDepartmentCount(["otherspecification"]);
      }
      if (departments.length) {
        await incrementDepartmentCount(departments);
      }
    }

    const updatedCounts = await TotalCount.find({});
    console.log("Incremented model data:", updatedCounts);

    return res.status(201).json({
      message: "Events updated successfully",
      events: createdEvents,
      year: year,
    });
  } catch (error) {
    console.error("Error in updateevent:", error.message);
    return res.status(500).json({
      message: "Sorry, there was an error processing your request.",
      error: error.message,
    });
  }
};

exports.updatedesigned = async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    const { eventid, status } = req.body;

    if (!eventid || !status) {
      return res.status(400).json({ message: "Event ID and status are required" });
    }

    const event = await Event.findById(eventid);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    console.log("Event before update:", event);
    event.designstatus = status; 
    await event.save();

    console.log("Event after update:", event);
    res.status(200).json({ designstatus: event.designstatus });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Error updating status" });
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
      { status: "decline" },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json({
      message: "Event status updated to declined successfully",
      event: updatedEvent,
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

    let events;
    if (!department || department.length === 0) {
      events = await Event.find({});
    } else if (department === "otherspecification") {
      events = await Event.find({
        departmentspecification: { $exists: true, $ne: [] },
      });
      console.log("Retrieved events for 'otherspecification':", events);
    } else {
      const departmentArray = Array.isArray(department)
        ? department
        : [department];
      console.log(departmentArray);
      events = await Event.find({
        $or: [
          { departments: { $in: departmentArray } },
          { departments: "All" },
        ],
      });
    }

    if (!events || events.length === 0) {
      return res.status(200).json([]);
    }

    console.log("Retrieved events:", events);
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
