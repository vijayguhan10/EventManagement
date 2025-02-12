const Event = require("../Schema/EventSchema");
const multer = require("multer");
const path = require("path");
const createEvent = async (req, res) => {
  console.log("Event Request form data:", req.body);
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

// ✅ Get All Events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get Event by ID
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update Event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res
      .status(200)
      .json({ message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const uploadPoster = async (req, res) => {
  console.log("Hitting the upload poster endpoint");
  try {
    const { eventId } = req.body;
    console.log("Event ID:", eventId);
    const posterUrl = `/uploads/${req.file.filename}`;

    const event = await Event.findByIdAndUpdate(
      eventId,
      { poster: posterUrl },
      { new: true }
    );

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json({ message: "Poster uploaded", event });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const approveEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    const event = await Event.findByIdAndUpdate(
      eventId,
      { status: "approved" },
      { new: true }
    );

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.status(200).json({ message: "Event approved", event });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  upload,
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  uploadPoster,
  approveEvent,
};
