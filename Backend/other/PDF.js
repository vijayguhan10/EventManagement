const { jsPDF } = require("jspdf");
const Event = require("../Schema/EventSchema");

exports.generatePdf = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const events = await Event.find({});

    const filteredEvents = events.filter((event) => {
      const eventStartDate = new Date(event.eventstartdate.replace(/-/g, "/"));
      const eventEndDate = new Date(event.eventenddate.replace(/-/g, "/"));
      const startYear = eventStartDate.getFullYear();
      const endYear = eventEndDate.getFullYear();

      return startYear === currentYear || endYear === currentYear;
    });

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Events Report for ${currentYear}`, 10, 10);
    doc.setFontSize(12);

    console.log("Filtered events data: ", filteredEvents);

    let y = 20;
    const pageHeight = doc.internal.pageSize.height;

    filteredEvents.forEach((event, index) => {
      if (y + 100 > P) {
        doc.addPage();
        y = 10;
      }

      doc.text(`Event ${index + 1}:`, 10, y);
      doc.text(`Title: ${event.eventname}`, 20, y + 10);
      doc.text(`Organizer: ${event.organizer}`, 20, y + 20);
      doc.text(`Resource Person: ${event.resourceperson}`, 20, y + 30);
      doc.text(`Start Date: ${event.eventstartdate}`, 20, y + 40);
      doc.text(`End Date: ${event.eventenddate}`, 20, y + 50);
      doc.text(`Start Time: ${event.eventstarttime}`, 20, y + 60);
      doc.text(`End Time: ${event.eventendtime}`, 20, y + 70);
      doc.text(`Venue: ${event.venue}`, 20, y + 80);
      doc.text(`Type of Event: ${event.typeofevent}`, 20, y + 90);
      doc.text(`Status: ${event.status}`, 20, y + 100);
      y += 110;
    });

    const pdfOutput = doc.output("arraybuffer");
    const buffer = Buffer.from(pdfOutput);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="events-report.pdf"'
    );
    res.send(buffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Failed to generate PDF");
  }
};
