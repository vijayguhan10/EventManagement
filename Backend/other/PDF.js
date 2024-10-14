const { jsPDF } = require("jspdf");
const eventsdata = require("../Schema/EventSchema");
const generatePdf = () => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Events Report for " + new Date().getFullYear(), 10, 10);

  doc.setFontSize(12);

  const currentYear = new Date().getFullYear();
  const filteredEvents = eventsdata.filter(
    (event) => new Date(event.eventenddate).getFullYear() === currentYear

  );

  let y = 20;
  filteredEvents.forEach((event, index) => {
    doc.text(`Event ${index + 1}:`, 10, y);
    doc.text(`Title: ${event.title}`, 20, y + 10);
    doc.text(`Date: ${event.date}`, 20, y + 20);
    doc.text(`Description: ${event.description}`, 20, y + 30);
    y += 40;
  });

  return doc.output("arraybuffer");
};

module.exports = generatePdf;
