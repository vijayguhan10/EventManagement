const express = require("express");
const twilio = require("twilio");
require("dotenv").config();
const Event = require("../Schema/EventSchema");

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const getMessage = async (req, res) => {
  try {
    const message = req.body.Body.trim();
    const num = "+918438434868"; // Receiver's WhatsApp number
    const today = new Date();

    // Format today's date as dd/mm/yy
    const formattedToday = `${String(today.getDate()).padStart(
      2,
      "0"
    )}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(
      today.getFullYear()
    ).slice(-2)}`;

    if (
      message.toLowerCase() === "today" ||
      message.toLowerCase() === "fulldata"
    ) {
      const eventsToday = await Event.find({ eventstartdate: formattedToday });
      let responseMessage = `Events scheduled for today (${formattedToday}):\n\n`;

      // Check if there are no events scheduled
      if (eventsToday.length === 0) {
        const noEventsMessage = "No events scheduled for today.";
        await client.messages.create({
          body: noEventsMessage,
          from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
          to: `whatsapp:${num}`,
        });
        return res.status(200).send("No events scheduled.");
      }

      // Build the response message based on the request type
      eventsToday.forEach((event) => {
        if (message.toLowerCase() === "today") {
          responseMessage += `*${event.typeofevent}*: ${event.eventname}\n\n`;
        } else {
          // "fulldata"
          responseMessage += `*Event Name*: ${event.eventname}\n`;
          responseMessage += `*Type of Event*: ${event.typeofevent}\n`;
          responseMessage += `*Resource Person*: ${event.resourceperson}\n`;
          responseMessage += `*Organizer*: ${event.organizer}\n`;
          responseMessage += `*Venue*: ${event.venue}\n`;
          responseMessage += `*Event Start*: ${event.eventstartdate} at ${event.eventstarttime}\n`;
          responseMessage += `*Event End*: ${event.eventenddate} at ${event.eventendtime}\n`;
          responseMessage += `*Status*: ${event.status}\n\n`;
        }
      });

      // Send the response message back to WhatsApp
      await client.messages.create({
        body: responseMessage,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${num}`,
      });

      return res.status(200).send("Message sent.");
    } else {
      return res.status(400).send("Invalid command.");
    }
  } catch (err) {
    console.error("Error:", err.message); // Log error message
    res.status(500).send("Error occurred while sending the message.");
  }
};



module.exports = { getMessage };
