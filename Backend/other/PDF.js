const { jsPDF } = require("jspdf");
const Event = require("../Schema/EventSchema");
const moment = require("moment");

const PdfConversion = async (filteredEvents, fromDate, toDate, res) => {
  const doc = new jsPDF();

  // Adding the college name and address with professional styling
  doc.setFontSize(22);
  doc.setFont("Helvetica", "bold");
  doc.setTextColor(0, 51, 102); // Dark blue for a professional look
  doc.text("Sri Eshwar College of Engineering", 10, 20);
  doc.setFontSize(16);
  doc.setTextColor(50, 50, 50); // Gray for address text
  doc.text("Coimbatore, Tamil Nadu", 10, 30);

  // Adding the college logo image at the top right
  const imageUrl =
    "https://jgkfab.p3cdn1.secureserver.net/wp-content/uploads/2024/05/Sri-Eshwar-College-Of-Engineering-Coimbatore.png";
  const image = await fetch(imageUrl)
    .then((res) => res.arrayBuffer())
    .then((buffer) => Buffer.from(buffer));

  doc.addImage(image, "PNG", 160, 5, 40, 25); // Adjusting position for styling

  // Adding the title for the event report with styling
  doc.setFontSize(20);
  doc.setTextColor(0, 102, 204); // Set text color to blue for the report title
  doc.text(
    `Events Report: ${
      fromDate && toDate ? `${fromDate} to ${toDate}` : "All Events"
    }`,
    10,
    50
  );

  let y = 60; // Starting position for event content
  const pageHeight = doc.internal.pageSize.height;

  // Iterate through each event and present it as a separate table
  filteredEvents.forEach((event, index) => {
    if (y + 90 > pageHeight) {
      doc.addPage();
      y = 20;
    }

    // Event title and section separator
    doc.setFontSize(16);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(`Event ${index + 1}: ${event.eventname}`, 10, y);

    y += 10;

    // Define table rows (key-value pairs for the event details)
    const eventDetails = [
      { key: "Department", value: event.departments },
      { key: "Organizer", value: event.organizer },
      { key: "Resource Person", value: event.resourceperson },
      {
        key: "Start Date",
        value: moment(event.eventstartdate, "DD/MM/YYYY").format("DD-MM-YYYY"),
      },
      {
        key: "End Date",
        value: moment(event.eventenddate, "DD/MM/YYYY").format("DD-MM-YYYY"),
      },
      { key: "Start Time", value: event.eventstarttime },
      { key: "End Time", value: event.eventendtime },
      { key: "Venue", value: event.venue },
      { key: "Type of Event", value: event.typeofevent },
      { key: "Status", value: event.status },
    ];

    // Define table column positions
    let startX = 10;
    let rowHeight = 10;

    // Draw the table row by row
    eventDetails.forEach((row) => {
      // Key column
      doc.setFontSize(12);
      doc.setFont("Helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${row.key}:`, startX, y);

      // Value column
      doc.setFontSize(12);
      doc.setFont("Helvetica", "normal");
      doc.text(row.value || "N/A", startX + 50, y); // Aligning value 50 units to the right

      y += rowHeight;
    });

    // Add spacing before the next event
    y += 10;

    // Draw a line under the table for each event
    doc.setDrawColor(0, 102, 204); // Blue border
    doc.line(10, y - 2, 200, y - 2);
  });

  // Generating the PDF and sending the response
  const pdfOutput = doc.output("arraybuffer");
  const buffer = Buffer.from(pdfOutput);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="events-report.pdf"'
  );
  res.send(buffer);
};

exports.generatePdf = async (req, res) => {
  try {
    const { fromDate, toDate, departments } = req.query;

    const events = await Event.find({});

    const filteredEvents = events.filter((event) => {
      const eventStartDate = moment(event.eventstartdate, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );

      if (isNaN(new Date(eventStartDate).getTime())) {
        console.error(
          "Invalid date format in the database for event:",
          event.eventstartdate
        );
        return false;
      }

      if (fromDate && toDate) {
        const from = moment(fromDate).format("YYYY-MM-DD");
        const to = moment(toDate).format("YYYY-MM-DD");
        if (!(eventStartDate >= from && eventStartDate <= to)) {
          return false;
        }
      }

      if (departments && !departments.includes("All")) {
        if (!departments.includes(event.departments)) {
          return false;
        }
      }

      return true;
    });

    PdfConversion(filteredEvents, fromDate, toDate, res);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Failed to generate PDF");
  }
};
