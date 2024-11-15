var nodemailer = require("nodemailer");

require("dotenv").config();
const Event = require("../Schema/EventSchema");
const convertTo12HourFormat = (time) => {
  let [hours, minutes] = time.split(":").map(Number); // Assuming time is in HH:MM format
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert hour to 12-hour format
  minutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading zero if minutes are less than 10
  return `${hours}:${minutes} ${period}`;
};

const sendAutoSchedulingEmail = async () => {
  try {
    const recipientEmails = [
      "vijayguhan10@gmail.com",
      "sabari.m2023cse@sece.ac.in",
      "sabarim636901@gmail.com",
    ];

    const today = new Date();
    const formattedToday = `${String(today.getDate()).padStart(
      2,
      "0"
    )}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(
      today.getFullYear()
    ).slice(-2)}`;

    // Fetch events scheduled for today
    const eventsToday = await Event.find({ eventstartdate: formattedToday });
    if (eventsToday.length === 0) {
      const noEventsMessage = "No events scheduled for today.";
      console.log(noEventsMessage);

      // Send email notifying no events
      await sendEmail(recipientEmails, "No Events Scheduled", noEventsMessage);
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
      const eventStartTimeFormatted = convertTo12HourFormat(
        event.eventstarttime
      );
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
    await sendEmail(
      recipientEmails,
      `Events Scheduled for ${formattedToday}`,
      htmlContent
    );
    console.log("Email sent for today's events.");
  } catch (err) {
    console.error("Error:", err);
  }
};

const sendEmail = async (to, subject, htmlContent) => {
  // Set up the SMTP transport for Gmail
  var sender = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sabarim6369@gmail.com", // Your Gmail address
      pass: "gsdn ofbj bvqp bwxt", // Your Gmail app password (NOT your Gmail account password)
    },
  });

  // Compose the email to multiple recipients
  var composeMail = {
    from: "sabarim6369@gmail.com", // Sender address
    to: to.join(", "), // Join all recipient emails with a comma
    subject: subject, // Subject line
    html: htmlContent, // HTML body content
  };

  // Use async/await for sending the email
  try {
    const info = await sender.sendMail(composeMail);
    console.log("Mail sent successfully:", info.response);
    // res.status(200).json({messages:"data passded sucessfully"});
  } catch (err) {
    console.log("Some problem occurred:", err);
  }
};

module.exports = { sendAutoSchedulingEmail };
