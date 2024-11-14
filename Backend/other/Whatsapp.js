const twilio = require("twilio");
const cloudinary = require("cloudinary").v2;
const cron = require("node-cron");
require("dotenv").config();
const Event = require("../Schema/EventSchema");
const nodeHtmlToImage = require("node-html-to-image");
const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const axios = require("axios");
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

const num = "+918438434868";

const sendTodaysEvents = async () => {
  console.log("function called");
  try {
    const today = new Date();
    const formattedToday = `${String(today.getDate()).padStart(
      2,
      "0"
    )}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(
      today.getFullYear()
    ).slice(-2)}`;

    const eventsToday = await Event.find({ eventstartdate: formattedToday });
    let responseMessage = ` Todays Events on (${formattedToday}):\n\n`;

    if (eventsToday.length === 0) {
      const noEventsMessage = "No events scheduled for today.";
      await client.messages.create({
        body: noEventsMessage,
        from: `${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${num}`,
      });
      console.log("No events scheduled.");
      return;
    }

    eventsToday.forEach((event) => {
      responseMessage += `*Event Name*: ${event.eventname}\n`;
      responseMessage += `*Type of Event*: ${event.typeofevent}\n`;
      // responseMessage += `*Resource Person*: ${event.resourceperson}\n`;
      responseMessage += `*Department*: ${event.departments[0]}\n`;
      responseMessage += `*Venue*: ${event.venue}\n`;
      responseMessage += `*Event Start*: ${event.eventstartdate} at ${event.eventstarttime}\n`;
      responseMessage += `*Event End*: ${event.eventenddate} at ${event.eventendtime}\n`;
      responseMessage += `*Status*: ${event.status}\n\n`;
    });

    await client.messages.create({
      body: responseMessage,
      from: `whatsapp:+14155238886`,
      to: `whatsapp:${num}`,
    });
    console.log("Message sent for today's events.");
  } catch (err) {
    console.error("Error:", err.message);
  }
};

const SendAutoScheduling = async () => {
  try {
    const today = new Date();
    const formattedToday = `${String(today.getDate()).padStart(
      2,
      "0"
    )}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(
      today.getFullYear()
    ).slice(-2)}`;

    const eventsToday = await Event.find({ eventstartdate: formattedToday });
    if (eventsToday.length === 0) {
      const noEventsMessage = "No events scheduled for today.";
      await client.messages.create({
        body: noEventsMessage,
        from: `whatsapp:+14155238886`,
        to: `whatsapp:${num}`,
      });
      console.log("No events scheduled.");
      return;
    }

    let htmlContent = ` 
      <html>
        <body style="font-family: Arial, sans-serif;">
          <h1 style="text-align: center;">Auto Scheduling Events for ${formattedToday}</h1>
          <table border="1" cellspacing="0" cellpadding="8" style="width: 100%; border-collapse: collapse;">
            <tr>
              <th>Event Name</th>
              <th>Type of Event</th>
              <th>Department</th>
              <th>Venue</th>
              <th>Event Start</th>
              <th>Event End</th>
              <th>Status</th>
            </tr>`;

    eventsToday.forEach((event) => {
      htmlContent += `
        <tr>
          <td>${event.eventname}</td>
          <td>${event.typeofevent}</td>
          <td>${event.departments[0]}</td>
          <td>${event.venue}</td>
          <td>${event.eventstartdate} at ${event.eventstarttime}</td>
          <td>${event.eventenddate} at ${event.eventendtime}</td>
          <td>${event.status}</td>
        </tr>`;
    });

    htmlContent += `
          </table>
        </body>
      </html>`;

    // Path to save the image generated from HTML content
    const imagePath = "D:/EventManagement/Backend/event-schedule-image.png";
    console.log("Saving image to: ", imagePath);

    await nodeHtmlToImage({
      output: imagePath,
      html: htmlContent,
    });
    console.log("Image generated successfully.");

    cloudinary.config({
      cloud_name: "dcwji5ei8",
      api_key: "547275286925134",
      api_secret: "WHCckQ1aIg4jGq59qoK3HIeDDOU",
    });

    const cloudinaryResponse = await cloudinary.uploader.upload(imagePath, {
      folder: "event_schedules",
    });
    const cloudinaryUrl = cloudinaryResponse.secure_url;
    console.log("Image uploaded to Cloudinary. URL:", cloudinaryUrl);

    await client.messages.create({
      body: "Today's Events",
      from: `${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${num}`,
      mediaUrl: [cloudinaryUrl],
    });

    console.log("Message sent for today's events with image.");
  } catch (err) {
    console.error("Error:", err);
  }
};

// cron.schedule("* * * * * *", () => {
//   console.log("Scheduled job running every minute...");
//   SendAutoScheduling();
// });

const getMessage = async (req, res) => {
  try {
    const message = req.body.Body.trim();
    const today = new Date();
    console.log("Incomming message : ");
    const formattedToday = `${String(today.getDate()).padStart(
      2,
      "0"
    )}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(
      today.getFullYear()
    ).slice(-2)}`;

    const department = departmentOptions.find(
      (dept) => dept.shortName.toLowerCase() === message.toLowerCase()
    );

    if (department) {
      const filter = { eventstartdate: formattedToday };
      if (department.fullName !== "All") {
        filter.departments = department.fullName;
      }

      const eventsToday = await Event.find(filter);
      let responseMessage = `Events scheduled for today (${formattedToday}) in ${department.fullName}:\n\n`;

      if (eventsToday.length === 0) {
        const noEventsMessage = `No events scheduled for today in ${department.fullName}.`;
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
        responseMessage += `*Department*: ${event.departments[0]}\n`;
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
      console.log("message sent for spec department");

      return res.status(200).send("Message sent.");
    } else if (message.toLowerCase() === "today") {
      console.log("consoling today");
      await sendTodaysEvents();
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
