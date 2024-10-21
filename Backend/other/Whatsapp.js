const express = require("express");
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
  { fullName: "All", shortName: "All" },
];

const getMessage = async (req, res) => {
  try {
    const message = req.body.Body.trim();
    const num = "+918438434868";
    const today = new Date();

    // Format today's date as dd/mm/yy
    const formattedToday = `${String(today.getDate()).padStart(
      2,
      "0"
    )}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(
      today.getFullYear()
    ).slice(-2)}`;

    // Find the department that matches the message short name
    const department = departmentOptions.find(
      (dept) => dept.shortName.toLowerCase() === message.toLowerCase()
    );

    if (department) {
      // Fetch events for today filtered by department (if not "All")
      const filter = { eventstartdate: formattedToday };
      if (department.fullName !== "All") {
        filter.departments = department.fullName;
      }

      const eventsToday = await Event.find(filter);
      let responseMessage = `Events scheduled for today (${formattedToday}) in ${department.fullName}:\n\n`;

      // Check if there are no events scheduled
      if (eventsToday.length === 0) {
        const noEventsMessage = `No events scheduled for today in ${department.fullName}.`;
        await client.messages.create({
          body: noEventsMessage,
          from: `${process.env.TWILIO_WHATSAPP_NUMBER}`,
          to: `whatsapp:${num}`,
        });
        return res.status(200).send("No events scheduled.");
      }

      // Build the response message with event details
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
        from: `${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${num}`,
      });

      return res.status(200).send("Message sent.");
    } else if (message.toLowerCase() === "today") {
      // If 'today' is sent, retrieve all events without department filter
      const eventsToday = await Event.find({ eventstartdate: formattedToday });
      let responseMessage = `Events scheduled for today (${formattedToday}):\n\n`;

      if (eventsToday.length === 0) {
        const noEventsMessage = "No events scheduled for today.";
        await client.messages.create({
          body: noEventsMessage,
          from: `${process.env.TWILIO_WHATSAPP_NUMBER}`,
          to: `whatsapp:${num}`,
        });
        return res.status(200).send("No events scheduled.");
      }

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
        from: `${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${num}`,
      });

      return res.status(200).send("Message sent.");
    } else {
      return res.status(400).send("Invalid command.");
    }
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send("Error occurred while sending the message.", err);
  }
};

module.exports = { getMessage };
