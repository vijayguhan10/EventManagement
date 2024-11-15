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
const convertTo12HourFormat = (time) => {
  let [hours, minutes] = time.split(':').map(Number); // Assuming time is in HH:MM format
  let period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert hour to 12-hour format
  minutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero if minutes are less than 10
  return `${hours}:${minutes} ${period}`;
};

const sendAutoSchedulingEmail = async (recipientEmails) => {
  try {
    const today = new Date();
    const formattedToday = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getFullYear()).slice(-2)}`;

    // Fetch events scheduled for today
    const eventsToday = await Event.find({ eventstartdate: formattedToday });
    if (eventsToday.length === 0) {
      const noEventsMessage = "No events scheduled for today.";
      console.log(noEventsMessage);

      // Send email notifying no events
      await sendEmail(recipientEmails, 'No Events Scheduled', noEventsMessage);
      return;
    }

    // Prepare the HTML content for the email
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
              <th>Design Status</th>
            </tr>`;

    // Loop through events and append them to the table
    eventsToday.forEach((event) => {
      const eventStartTimeFormatted = convertTo12HourFormat(event.eventstarttime);
      const eventEndTimeFormatted = convertTo12HourFormat(event.eventendtime);

      htmlContent += `
        <tr>
          <td>${event.eventname}</td>
          <td>${event.typeofevent}</td>
          <td>${event.departments[0]}</td>
          <td>${event.venue}</td>
          <td>${event.eventstartdate} at ${eventStartTimeFormatted}</td>
          <td>${event.eventenddate} at ${eventEndTimeFormatted}</td>
          <td>${event.status}</td>
          <td>${event.designstatus}</td>
        </tr>`;
    });

    htmlContent += `
          </table>
        </body>
      </html>`;

    // Send the email with the event details to multiple recipients
    await sendEmail(recipientEmails, `Events Scheduled for ${formattedToday}`, htmlContent);
    console.log("Email sent for today's events.");
  } catch (err) {
    console.error("Error:", err);
  }
};

const sendEmail = async (to, subject, htmlContent) => {
  var nodemailer = require("nodemailer");

  // Set up the SMTP transport for Gmail
  var sender = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sabarim6369@gmail.com", // Your Gmail address
      pass: "gsdn ofbj bvqp bwxt",  // Your Gmail app password (NOT your Gmail account password)
    },
  });

  // Compose the email to multiple recipients
  var composeMail = {
    from: "sabarim6369@gmail.com", // Sender address
    to: to.join(", "),            // Join all recipient emails with a comma
    subject: subject,             // Subject line
    html: htmlContent,            // HTML body content
  };

  // Use async/await for sending the email
  try {
    const info = await sender.sendMail(composeMail);
    console.log("Mail sent successfully:", info.response);
  } catch (err) {
    console.log("Some problem occurred:", err);
  }
};

const recipientEmails = ['vijayguhan10@gmail.com', 'sabari.m2023cse@sece.ac.in', 'sabarim636901@gmail.com'];

// cron.schedule("* * * * * *", () => {
//   console.log("Scheduled job running...");
//   sendAutoSchedulingEmail(recipientEmails);
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
