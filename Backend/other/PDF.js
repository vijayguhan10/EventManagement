const { jsPDF } = require("jspdf");
const Event = require("../Schema/EventSchema");
const moment = require("moment");

const PdfConversion = async (filteredEvents, fromDate, toDate, res) => {
  const doc = new jsPDF();

  // Adding the college name and address
  doc.setFontSize(18);
  doc.text("Sri Eshwar College of Engineering", 10, 10);
  doc.setFontSize(14);
  doc.text("Coimbatore", 10, 18);

  // Adding the image of the college logo at the top right
  const imageUrl =
    "https://jgkfab.p3cdn1.secureserver.net/wp-content/uploads/2024/05/Sri-Eshwar-College-Of-Engineering-Coimbatore.png";
  const image = await fetch(imageUrl)
    .then((res) => res.arrayBuffer())
    .then((buffer) => Buffer.from(buffer));

  doc.addImage(image, "PNG", 160, 5, 40, 20); // Adjust the position and size as needed

  // Adding the title for the event report
  doc.setFontSize(18);
  doc.setTextColor(0, 102, 204); // Set text color to blue for the report title
  doc.text(
    `Events Report for ${
      fromDate && toDate ? `${fromDate} to ${toDate}` : "All Events"
    }`,
    10,
    40
  );
  doc.setFontSize(12);

  let y = 50;
  const pageHeight = doc.internal.pageSize.height;

  // Iterate through the filtered events and display them in the PDF
  filteredEvents.forEach((event, index) => {
    if (y + 110 > pageHeight) {
      doc.addPage();
      y = 10;
    }

    // Event section title
    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(`Event ${index + 1}:`, 10, y);

    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");

    // Draw a border for the event details
    doc.setDrawColor(0, 102, 204); // Blue border
    doc.rect(10, y + 2, 190, 110);

    // Adding event details
    doc.text(`Department: ${event.departments}`, 20, y + 10);
    doc.text(`Title: ${event.eventname}`, 20, y + 20);
    doc.text(`Organizer: ${event.organizer}`, 20, y + 30);
    doc.text(`Resource Person: ${event.resourceperson}`, 20, y + 40);
    doc.text(`Start Date: ${event.eventstartdate}`, 20, y + 50);
    doc.text(`End Date: ${event.eventenddate}`, 20, y + 60);
    doc.text(`Start Time: ${event.eventstarttime}`, 20, y + 70);
    doc.text(`End Time: ${event.eventendtime}`, 20, y + 80);
    doc.text(`Venue: ${event.venue}`, 20, y + 90);
    doc.text(`Type of Event: ${event.typeofevent}`, 20, y + 100);
    doc.text(`Status: ${event.status}`, 20, y + 110);

    // Move to the next event
    y += 120;
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
    const { fromDate, toDate, departments,year,fullYear} = req.query;
    console.log("Required data for the pdf:", req.query);

    const events = await Event.find({});
    console.log("All events fetched:", events);

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
