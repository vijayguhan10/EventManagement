const twilio = require("twilio");
require("dotenv").config();
const Event = require("../Schema/EventSchema");
const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const clearQueuedMessages = async () => {
  try {
    const messages = await client.messages.list({
      status: "queued",
      limit: 20, // Adjust based on your requirements
    });

    if (messages.length === 0) {
      console.log("No queued messages found.");
      return;
    }

    for (const message of messages) {
      await client.messages(message.sid).update({ status: "canceled" });
      console.log(`Canceled message SID: ${message.sid}`);
    }
    console.log("Queued messages cleared.");
  } catch (err) {
    console.error("Error clearing queued messages:", err);
  }
};

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

    // Automatically clear queued messages if the status is "queued"
    await clearQueuedMessages();

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
      console.log("Response from WhatsApp: ", response);
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
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred while processing the message.");
  }
};

module.exports = { getMessage };
