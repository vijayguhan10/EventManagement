const twilio = require("twilio");
require("dotenv").config();
const Event = require("../Schema/EventSchema");
const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const departmentOptions = [
  { fullName: "Computer and Communication Engineering", shortName: "CCE" },
  { fullName: "Computer Science Engineering", shortName: "CSE" },
  {
    fullName: "Artificial Intelligence and Data Science",
    shortName: "AI & DS",
  },
  { fullName: "Electronics and Communication Engineering", shortName: "ECE" },
  { fullName: "Information Technology", shortName: "IT" },
  { fullName: "Mechanical Engineering", shortName: "MECH" },
  {
    fullName: "Artificial Intelligence and Machine Learning",
    shortName: "AI & ML",
  },
  { fullName: "Computer Science and Business Systems", shortName: "CSBS" },
  { fullName: "Electrical and Electronics Engineering", shortName: "EEE" },
  { fullName: "Cybersecurity", shortName: "Cyber" },
  { fullName: "All", shortName: "All" },
];

const getMessage = async (req, res) => {
  try {
    const message = req.body.Body.trim().toLowerCase(); // Convert to lowercase for consistency
    const num = "+918438434868"; // User's phone number for WhatsApp message
    const today = new Date();

    // Format today's date in DD/MM/YY format
    const formattedToday = `${String(today.getDate()).padStart(
      2,
      "0"
    )}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(
      today.getFullYear()
    ).slice(-2)}`;

    // Find today's events
    const eventsToday = await Event.find({ eventstartdate: formattedToday });

    if (message === "today") {
      if (eventsToday.length === 0) {
        const noEventsMessage = "No events scheduled for today.";
        await client.messages.create({
          body: noEventsMessage,
          from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
          to: `whatsapp:${num}`,
        });
        return res.status(200).send("No events found.");
      }

      let responseMessage = `Events scheduled for today (${formattedToday}):\n\n`;
      eventsToday.forEach((event) => {
        responseMessage += `*${event.typeofevent}*: ${event.eventname}\n\n`;
      });

      await client.messages.create({
        body: responseMessage,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${num}`,
      });

      return res.status(200).send("Message sent.");
    }

    if (message === "fulldata") {
      if (eventsToday.length === 0) {
        const noEventsMessage = "No events scheduled for today.";
        await client.messages.create({
          body: noEventsMessage,
          from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
          to: `whatsapp:${num}`,
        });
        return res.status(200).send("No events found.");
      }

      let responseMessage = `Full event details for today (${formattedToday}):\n\n`;
      eventsToday.forEach((event) => {
        responseMessage += `*Event Name*: ${event.eventname}\n`;
        responseMessage += `*Type of Event*: ${event.typeofevent}\n`;
        responseMessage += `*Resource Person*: ${event.resourceperson}\n`;
        responseMessage += `*Organizer*: ${event.organizer}\n`;
        responseMessage += `*Venue*: ${event.venue}\n`;
        responseMessage += `*Event Start*: ${event.eventstartdate} at ${event.eventstarttime}\n`;
        responseMessage += `*Event End*: ${event.eventenddate} at ${event.eventendtime}\n`;
        responseMessage += `*Status*: ${event.status}\n\n`;
      });

      await client.messages.create({
        body: responseMessage,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${num}`,
      });

      return res.status(200).send("Message sent.");
    }

    // Check for department-specific queries dynamically
    const departmentOption = departmentOptions.find(
      (dept) => dept.shortName.toLowerCase() === message
    );

    if (departmentOption) {
      let departmentEvents;
      if (departmentOption.shortName === "All") {
        departmentEvents = eventsToday;
      } else {
        departmentEvents = eventsToday.filter((event) =>
          event.departments.includes(departmentOption.fullName)
        );
      }

      if (departmentEvents.length === 0) {
        const noEventsMessage = `No events scheduled for today for ${departmentOption.fullName} department.`;
        await client.messages.create({
          body: noEventsMessage,
          from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
          to: `whatsapp:${num}`,
        });
        return res.status(200).send("No department events found.");
      }

      let responseMessage = `Events scheduled for today (${formattedToday}) in the ${departmentOption.fullName} department:\n\n`;
      departmentEvents.forEach((event) => {
        responseMessage += `*Event Name*: ${event.eventname}\n`;
        responseMessage += `*Type of Event*: ${event.typeofevent}\n`;
        responseMessage += `*Resource Person*: ${event.resourceperson}\n`;
        responseMessage += `*Organizer*: ${event.organizer}\n`;
        responseMessage += `*Venue*: ${event.venue}\n`;
        responseMessage += `*Event Start*: ${event.eventstartdate} at ${event.eventstarttime}\n`;
        responseMessage += `*Event End*: ${event.eventenddate} at ${event.eventendtime}\n`;
        responseMessage += `*Status*: ${event.status}\n\n`;
      });

      await client.messages.create({
        body: responseMessage,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${num}`,
      });

      return res.status(200).send("Department-specific message sent.");
    }

    res.status(400).send("Invalid command.");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred while sending the message.");
  }
};

module.exports = { getMessage };
