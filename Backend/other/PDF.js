const { jsPDF } = require("jspdf");
const Event = require("../Schema/EventSchema");
const moment = require("moment");

const PdfConversion = async (filteredEvents, fromDate, toDate, res) => {
  const doc = new jsPDF();

  // Adding the college name and address with elegant styling
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

  // Defining table headers with bold font
  const tableHeaders = [
    "S.No",
    "Department",
    "Title",
    "Organizer",
    "Resource Person",
    "Start Date",
    "End Date",
    "Venue",
    "Type",
    "Status",
  ];

  doc.setFontSize(12);
  doc.setFont("Helvetica", "bold");
  doc.setTextColor(0, 0, 0);

  let startY = 60;
  let colWidths = [10, 30, 40, 30, 40, 20, 20, 30, 15, 20]; // Column widths

  // Draw table headers
  let startX = 10;
  tableHeaders.forEach((header, index) => {
    doc.text(header, startX, startY);
    startX += colWidths[index];
  });

  doc.setFont("Helvetica", "normal");

  // Add a line under headers
  doc.setDrawColor(0, 102, 204); // Blue line
  doc.line(10, startY + 2, 200, startY + 2); // Draw a line under the header

  // Table row details for each event
  startY += 10; // Adjust Y position for rows

  filteredEvents.forEach((event, index) => {
    startX = 10;

    if (startY + 10 > doc.internal.pageSize.height) {
      doc.addPage();
      startY = 20;
    }

    // Format event details as rows in the table
    const row = [
      (index + 1).toString(),
      event.departments || "",
      event.eventname || "",
      event.organizer || "",
      event.resourceperson || "",
      moment(event.eventstartdate, "DD/MM/YYYY").format("DD-MM-YYYY") || "",
      moment(event.eventenddate, "DD/MM/YYYY").format("DD-MM-YYYY") || "",
      event.venue || "",
      event.typeofevent || "",
      event.status || "",
    ];

    row.forEach((text, idx) => {
      doc.text(text, startX, startY);
      startX += colWidths[idx];
    });

    // Add a line separator for each row
    doc.line(10, startY + 2, 200, startY + 2);
    startY += 10;
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
