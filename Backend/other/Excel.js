const ExcelJS = require("exceljs");
const Event = require("../Schema/EventSchema");
const moment = require("moment");

const ExcelConversion = async (req, res) => {
  try {
    const { fromDate, toDate, departments, year, fullYear } = req.query;
    const events = await Event.find({});
    const currentDate = moment();
    const oneYearAgo = currentDate
      .clone()
      .subtract(1, "year")
      .format("YYYY-MM-DD");

    const filteredEvents = events.filter((event) => {
      const eventStartDate = moment(event.eventstartdate, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
      const eventYear = event.year.toString();
      const eventDepartment = event.departments;

      if (isNaN(new Date(eventStartDate).getTime())) {
        console.error(
          "Invalid date format in the database for event:",
          event.eventstartdate
        );
        return false;
      }

      if (fullYear === "true") {
        if (eventStartDate < oneYearAgo) return false;
      } else if (fromDate && toDate) {
        const from = moment(fromDate).format("YYYY-MM-DD");
        const to = moment(toDate).format("YYYY-MM-DD");
        if (!(eventStartDate >= from && eventStartDate <= to)) return false;
      }

      if (year !== "All" && !year.includes(eventYear)) return false;

      if (departments && !departments.includes("All")) {
        if (!eventDepartment.some((dep) => departments.includes(dep)))
          return false;
      }

      return true;
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Events Report");

    // Header section
    worksheet.mergeCells("A1", "K1");
    worksheet.getCell("A1").value = "Sri Eshwar College of Engineering";
    worksheet.getCell("A1").font = { size: 18, bold: true };

    worksheet.mergeCells("A2", "K2");
    worksheet.getCell("A2").value = "Coimbatore";
    worksheet.getCell("A2").font = { size: 14 };

    worksheet.mergeCells("A4", "K4");
    worksheet.getCell("A4").value = `Events Report for ${
      fromDate && toDate ? `${fromDate} to ${toDate}` : "All Events"
    }`;
    worksheet.getCell("A4").font = { size: 16, color: { argb: "0066CC" } };

    // Manually adding header row
    const headerRow = worksheet.addRow([
      "Department",
      "Title",
      "Organizer",
      "Resource Person",
      "Start Date",
      "End Date",
      "Start Time",
      "End Time",
      "Venue",
      "Type of Event",
      "Status",
    ]);

    // Set style for each cell in the header row
    headerRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "CCCCCC" },
      };
    });

    // Remove this part to not define worksheet.columns

    worksheet.columns = [
      { key: "departments", width: 50 },
      { key: "eventname", width: 30 },
      { key: "organizer", width: 20 },
      { key: "resourceperson", width: 20 },
      { key: "eventstartdate", width: 15 },
      { key: "eventenddate", width: 15 },
      { key: "eventstarttime", width: 15 },
      { key: "eventendtime", width: 15 },
      { key: "venue", width: 20 },
      { key: "typeofevent", width: 20 },
      { key: "status", width: 15 },
    ];

    // Sort and add data rows
    filteredEvents.sort((a, b) => {
      const deptA = Array.isArray(a.departments)
        ? a.departments[0]
        : a.departments;
      const deptB = Array.isArray(b.departments)
        ? b.departments[0]
        : b.departments;
      return deptA.localeCompare(deptB);
    });

    filteredEvents.forEach((event) => {
      worksheet.addRow({
        departments: event.departments.join(", "),
        eventname: event.eventname,
        organizer: event.organizer,
        resourceperson: event.resourceperson,
        eventstartdate: event.eventstartdate,
        eventenddate: event.eventenddate,
        eventstarttime: event.eventstarttime,
        eventendtime: event.eventendtime,
        venue: event.venue,
        typeofevent: event.typeofevent,
        status: event.status,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="events-report.xlsx"'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error generating Excel:", error);
    res.status(500).send("Failed to generate Excel");
  }
};

module.exports = { ExcelConversion };
