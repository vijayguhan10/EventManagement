const { jsPDF } = require("jspdf");
const Event = require("../Schema/EventSchema");

exports.generatePdf = async (req, res) => {
  console.log(req);
  try {
    const { fromDate, toDate, departments, fulldata } = req.query; 
    console.log("Required data for the pdf:", req.query);

    const events = await Event.find({});
    console.log("All events fetched:", events);

    const filteredEvents = events.filter((event) => {
      const eventStartDate = new Date(event.eventstartdate.replace(/-/g, "/"));

     
      if (fromDate && toDate) {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        if (!(eventStartDate >= from && eventStartDate <= to)) {
          return false;
        }
      }
      if (departments) {
        const departmentArray = Array.isArray(departments)
          ? departments
          : [departments]; 
        if (departmentArray.includes("all")) {
          return true;
        }
        if (!departmentArray.includes(event.department)) {
          return false; 
        }
      }

      return true; 
    });

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(
      `Events Report for ${
        fromDate && toDate ? `${fromDate} to ${toDate}` : "All Events"
      }`,
      10,
      10
    );
    doc.setFontSize(12);

    let y = 20;
    const pageHeight = doc.internal.pageSize.height;

    filteredEvents.forEach((event, index) => {
      if (y + 100 > pageHeight) {
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
