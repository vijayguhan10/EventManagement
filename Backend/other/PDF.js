const { jsPDF } = require("jspdf");
const Event = require("../Schema/EventSchema");
const moment = require("moment");
const axios = require("axios");

const PdfConversion = async (filteredEvents, fromDate, toDate, res) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Sri Eshwar College of Engineering", 10, 10);
  doc.setFontSize(14);
  doc.text("Coimbatore", 10, 18);

  const imageUrl = "https://digri.ai/wp-content/uploads/2023/12/Logo-2-768x258.png";
  try {
    const image = await axios
      .get(imageUrl, { responseType: "arraybuffer" })
      .then((response) => Buffer.from(response.data, "binary"));
    doc.addImage(image, "PNG", 160, 5, 40, 20);
  } catch (error) {
    console.error("Error fetching the image:", error);
  }

  doc.setFontSize(18);
  doc.setTextColor(0, 102, 204);
  doc.text(
    `Events Report for ${fromDate && toDate ? `${fromDate} to ${toDate}` : "All Events"}`,
    10, 40
  );

  let y = 50;
  const pageHeight = doc.internal.pageSize.height;

  filteredEvents.sort((a, b) => {
    const aDepartment = a.departments && a.departments[0] ? a.departments[0] : "";
    const bDepartment = b.departments && b.departments[0] ? b.departments[0] : "";
    return aDepartment.localeCompare(bDepartment);
  });

  let currentDepartment = "";

  filteredEvents.forEach((event, index) => {
    const eventDepartment = event.departments && event.departments[0] ? event.departments[0] : "";

    if (eventDepartment && eventDepartment !== currentDepartment) {
      currentDepartment = eventDepartment;
      doc.setFontSize(16);
      doc.setFont("Helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${currentDepartment} Department`, 105, y, { align: "center" });
      y += 10;
      if (y + 120 > pageHeight) {
        doc.addPage();
        y = 10;
      }
    }

    if (y + 120 > pageHeight) {
      doc.addPage();
      y = 10;
    }

    doc.setFontSize(14);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text(`Event ${index + 1}:`, 10, y);

    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");

    doc.setDrawColor(0, 102, 204);
    doc.rect(10, y + 2, 190, 120);

    if (event.departments && event.departments.length > 0) {
      doc.text(`Department: ${event.departments.join(", ")}`, 20, y + 10);
    }

    if (event.departmentspecification && event.departmentspecification.length > 0) {
      doc.text(`Department Specification: ${event.departmentspecification.join(", ")}`, 20, y + 20);
    } else {
      doc.text(`Department Specification: All`, 20, y + 20);
    }

    doc.text(`Title: ${event.eventname}`, 20, y + 30);
    doc.text(`Organizer: ${event.organizer}`, 20, y + 40);

if (event.resourceperson && Array.isArray(event.resourceperson)) {
  const formattedResourcePersons = event.resourceperson
    .map(rp => {
      const [name, specialization] = Object.entries(rp)[0];
      return `${name || 'Unknown'} (${specialization || 'Unknown'})`; 
    })
    .join(", ");
  doc.text(`Resource Person: ${formattedResourcePersons}`, 20, y + 50);
} else {
  doc.text(`Resource Person: Unknown (Unknown)`, 20, y + 50); 
}


    doc.text(`Start Date: ${event.eventstartdate}`, 20, y + 60);
    doc.text(`End Date: ${event.eventenddate}`, 20, y + 70);
    doc.text(`Start Time: ${event.eventstarttime}`, 20, y + 80);
    doc.text(`End Time: ${event.eventendtime}`, 20, y + 90);
    doc.text(`Venue: ${event.venue}`, 20, y + 100);

    if (event.typeofevent) {
      doc.text(`Type of Event: ${event.typeofevent}`, 20, y + 110);
    }

    doc.text(`Status: ${event.status}`, 20, y + 120);

    y += 130;

    if (y + 130 > pageHeight) {
      doc.addPage();
      y = 10;
    }
  });

  const pdfOutput = doc.output("arraybuffer");
  const buffer = Buffer.from(pdfOutput);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment; filename="events-report.pdf"');
  res.send(buffer);
};
exports.generatePdf = async (req, res) => {
  try {
    const { fromDate, toDate, departments, year, fullYear, selectedeventtype } = req.query;
    console.log("Required data for the PDF:", req.query);

    const events = await Event.find({});
    console.log("events are", events);

    const currentDate = moment();
    const oneYearAgo = currentDate.clone().subtract(1, "year").format("YYYY-MM-DD");

    const filteredEvents = events.filter((event) => {
      const eventStartDate = moment(event.eventstartdate, "DD/MM/YY").format("YYYY-MM-DD");
      const eventEndDate = moment(event.eventenddate, "DD/MM/YY").format("YYYY-MM-DD");

      const from = moment(fromDate).format("YYYY-MM-DD");
      const to = moment(toDate).format("YYYY-MM-DD");
      if (!(eventStartDate >= from && eventEndDate <= to)) {
        return false;
      }

      if (year && !year.includes(event.year)) {
        return false;
      }

      const departmentMatch = departments && event.departments && departments.some(dept => event.departments.includes(dept));

      const specificationMatch = selectedeventtype && event.departmentspecification && selectedeventtype.some(spec => event.departmentspecification.includes(spec));

      if (departmentMatch || (selectedeventtype && specificationMatch)) {
        return true;
      }

      return false;
    });

    console.log("Filtered Events:", filteredEvents);
console.log("resource persons",events[0].resourceperson);
    PdfConversion(filteredEvents, fromDate, toDate, res);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Failed to generate PDF");
  }
};
