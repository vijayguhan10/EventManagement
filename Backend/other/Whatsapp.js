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
    const message = req.body.Body.trim();
    const num = "+918438434868";
    const today = new Date();

    const formattedToday = `${String(today.getDate()).padStart(
      2,
      "0"
    )}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(
      today.getFullYear()
    ).slice(-2)}`;

    if (message.toLowerCase() === "today") {
      const eventsToday = await Event.find({ eventstartdate: formattedToday });

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

      const response = await client.messages.create({
        body: responseMessage,
        from: "whatsapp:+14155238886",
        to: `whatsapp:${num}`,
      });

      return res.status(200).send("Message sent.");
    }
    if (message.toLowerCase() === "fulldata") {
      const eventsToday = await Event.find({ eventstartdate: formattedToday });

      if (eventsToday.length === 0) {
        const noEventsMessage = "No events scheduled for today.";
        await client.messages.create({
          body: noEventsMessage,
          from: "whatsapp:+14155238886",
          to: `whatsapp:${num}`,
        });
        return res.status(200).send("No events found.");
      }

      let responseMessage = `Events scheduled for today (${formattedToday}):\n\n`;
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

      const response = await client.messages.create({
        body: responseMessage,
        from: "whatsapp:+14155238886",
        to: `whatsapp:${num}`,
      });

      return res.status(200).send("Message sent.");
    }
     

    if (message.toLowerCase() === "cse") {
      const department = eventsToday.filter(
        (elem) => elem.departments[0] === "Computer Science Engineering"
      );

      if (department.length === 0) {
        const noEventsMessage = "No events scheduled for today. for cse department";
        await client.messages.create({
          body: noEventsMessage,
          from: "whatsapp:+14155238886",
          to: `whatsapp:${num}`,
        });
        return res.status(200).send("No events found.");
      }

      let responseMessage = `Events scheduled for today (${formattedToday}): for cse department\n\n`;
      department.forEach((event) => {
        responseMessage += `*Event Name*: ${event.eventname}\n`;
        responseMessage += `*Type of Event*: ${event.typeofevent}\n`;
        responseMessage += `*Resource Person*: ${event.resourceperson}\n`;
        responseMessage += `*Organizer*: ${event.organizer}\n`;
        responseMessage += `*Venue*: ${event.venue}\n`;
        responseMessage += `*Event Start*: ${event.eventstartdate} at ${event.eventstarttime}\n`;
        responseMessage += `*Event End*: ${event.eventenddate} at ${event.eventendtime}\n`;
        responseMessage += `*Status*: ${event.status}\n\n`;
      });

      const response = await client.messages.create({
        body: responseMessage,
        from: "whatsapp:+14155238886",
        to: `whatsapp:${num}`,
      });

      return res.status(200).send("Message sent.");
    }








  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred while sending the message.");
  }
};

module.exports = { getMessage };
