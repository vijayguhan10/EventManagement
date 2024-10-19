const twilio = require("twilio");
require("dotenv").config();
const Event = require("../Schema/EventSchema");
const cron = require("node-cron"); // Import node-cron

const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Function to send today's events
const sendTodaysEvents = async () => {
  try {
    const num = "+918438434868"; // Your recipient number
    const today = new Date();

    const formattedToday = `${String(today.getDate()).padStart(
      2,
      "0"
    )}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(
      today.getFullYear()
    ).slice(-2)}`;

    const eventsToday = await Event.find({ eventstartdate: formattedToday });

    let responseMessage;
    if (eventsToday.length === 0) {
      responseMessage = "No events scheduled for today.";
    } else {
      responseMessage = `Events scheduled for today (${formattedToday}):\n\n`;
      eventsToday.forEach((event) => {
        responseMessage += `*${event.typeofevent}*: ${event.eventname}\n\n`;
      });
    }

    console.log(
      "Sending message from:",
      `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`
    );
    console.log("responesssssssssss message : ",responseMessage);

    await client.messages.create({
      body: responseMessage,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${num}`,
    });

    console.log("Message sent successfully!");
  } catch (error) {
    console.error("Error occurred while sending the message:", error);
  }
};

cron.schedule("* *  * * *", () => {
  console.log("Sending today's events...");
  sendTodaysEvents().catch((err) => console.error(err));
});

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
          from: `whatsapp:+14155238886`,
          to: `whatsapp:+918438434868`,
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

    if (message.toLowerCase() === "fulldata") {
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
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred while sending the message.");
  }
};

module.exports = { getMessage };
