const { jsPDF } = require("jspdf");
const Event = require("../Schema/EventSchema");
const moment = require("moment");
const PdfConversion = async (filteredEvents, fromDate, toDate, res) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Sri Eshwar College of Engineering", 10, 10);
  doc.setFontSize(14);
  doc.text("Coimbatore", 10, 18);

  const imageUrl =
    "https://jgkfab.p3cdn1.secureserver.net/wp-content/uploads/2024/05/Sri-Eshwar-College-Of-Engineering-Coimbatore.png";
  const image = await fetch(imageUrl)
    .then((res) => res.arrayBuffer())
    .then((buffer) => Buffer.from(buffer));

  doc.addImage(image, "PNG", 160, 5, 40, 20); 

  doc.setFontSize(18);
  doc.setTextColor(0, 102, 204); 
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

  filteredEvents.sort((a, b) => {
    const deptA = Array.isArray(a.departments) ? a.departments[0] : a.departments;
    const deptB = Array.isArray(b.departments) ? b.departments[0] : b.departments;
    return deptA.localeCompare(deptB);
  });

  let currentDepartment = "";

  filteredEvents.forEach((event, index) => {
    const eventDepartment = Array.isArray(event.departments) ? event.departments[0] : event.departments;

    if (eventDepartment !== currentDepartment) {
      currentDepartment = eventDepartment;

      doc.setFontSize(16);
      doc.setFont("Helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${currentDepartment} Department`, 105, y, { align: "center" });
      y += 10;

      if (y + 110 > pageHeight) {
        doc.addPage();
        y = 10;
      }
    }

    if (y + 110 > pageHeight) {
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
    doc.rect(10, y + 2, 190, 110);

    doc.text(`Department: ${event.departments.join(", ")}`, 20, y + 10);
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

    y += 120;
  });

  
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
    const { fromDate, toDate, departments, year, fullYear } = req.query;
    console.log("Required data for the PDF:", req.query);

    const events = await Event.find({});
    const currentDate = moment();
    const oneYearAgo = currentDate.clone().subtract(1, "year").format("YYYY-MM-DD");

    const filteredEvents = events.filter((event) => {
      const eventStartDate = moment(event.eventstartdate, "DD/MM/YYYY").format("YYYY-MM-DD");
      const eventYear = event.year.toString(); 
      const eventDepartment = event.departments;

      if (isNaN(new Date(eventStartDate).getTime())) {
        console.error("Invalid date format in the database for event:", event.eventstartdate);
        return false;
      }

      // Full year logic: Include events from the past one year
      if (fullYear === "true") {
        if (eventStartDate < oneYearAgo) {
          return false;
        }
      } else {
        // Date range filtering
        if (fromDate && toDate) {
          const from = moment(fromDate).format("YYYY-MM-DD");
          const to = moment(toDate).format("YYYY-MM-DD");
          if (!(eventStartDate >= from && eventStartDate <= to)) {
            return false;
          }
        }
      }

      // Year filtering logic: Handle "All" case and specific years
      if (year !== "All") {
        if (!(year.includes('1') && year.includes('2') && year.includes('3') && year.includes('4'))) {
          if (!year.includes(eventYear)) {
            return false;
          }
        }
      }

      // Department filtering
      if (departments && !departments.includes("All")) {
        if (!eventDepartment.some(dep => departments.includes(dep))) {
          return false;
        }
      }

      return true;
    });

    console.log(filteredEvents, "Filtered Events 😃😆");

    // Generate the PDF with the filtered events
    PdfConversion(filteredEvents, fromDate, toDate, res);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Failed to generate PDF");
  }
};
