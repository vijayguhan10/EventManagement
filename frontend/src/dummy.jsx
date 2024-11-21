<div className="container absolute bottom-[-65%] left-[55%] w-[43%] mx-auto p-4 border-black rounded-xl shadow-lg z-50">
<h1 className="text-xl font-bold text-center text-black">
  Department Report Generator
</h1>
{errorMessage && (
  <p className="text-red-600 text-center mt-1">{errorMessage}</p>
)}

{/* Date range and full-year toggle section */}
<div className="flex justify-between items-center space-x-4 mb-2">
  <div>
    <h2 className="text-xl font-semibold text-gray-700">From Date</h2>
    <input
      type="date"
      value={fromDate}
      onChange={(e) => setFromDate(e.target.value)}
      className="p-2 border rounded-lg focus:outline-none w-48 text-xl h-10 focus:ring-2 focus:ring-green-400"
      disabled={isFullYear}
    />
  </div>
  <div>
    <h2 className="text-xl font-semibold text-gray-700">To Date</h2>
    <input
      type="date"
      value={toDate}
      onChange={(e) => setToDate(e.target.value)}
      className="p-2 border rounded-lg focus:outline-none w-48 text-xl h-10 focus:ring-2 focus:ring-green-400"
      disabled={isFullYear}
    />
  </div>
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      checked={isFullYear}
      onChange={handleFullYearChange}
      className="form-checkbox h-4 w-4 text-green-600"
    />
    <label className="text-gray-700 text-xl font-semibold">
      Full Year
    </label>
  </div>
</div>

{/* Departments section */}
<div className="mb-2">
  <h2 className="text-lg font-semibold text-gray-700 mb-2">
    Departments
  </h2>
  <div className="flex flex-wrap gap-4">
    {departmentOptions.map((department) => (
      <div
        key={department.shortName}
        className="flex items-center font-bold space-x-2"
      >
        <input
          type="checkbox"
          value={department.shortName}
          checked={departments.includes(department.fullName)}
          onChange={handleDepartmentChange}
          className="form-checkbox font-bold h-4 w-4 text-green-600"
          disabled={
            departments.includes("All") &&
            department.shortName !== "All"
          }
        />
        <span className="text-gray-700 font-bold text-lg">
          {department.shortName}
        </span>
      </div>
    ))}
  </div>
</div>

{/* Year section with specify event types button */}
<div className="mb-4 flex items-center justify-between">
  <div className="flex items-center">
    <h2 className="text-xl font-semibold text-gray-700 pr-4">Year</h2>
    <div className="flex gap-2">
      {[1, 2, 3, 4, "All"].map((year) => (
        <div key={year} className="flex items-center space-x-3">
          <input
            type="checkbox"
            value={year}
            checked={
              year === "All"
                ? selectedYears.length === 4
                : selectedYears.includes(year)
            }
            onChange={(e) => handleYearChange(e, year)}
            className="form-checkbox h-4 w-4 text-green-600"
            disabled={selectedYears.includes("All") && year !== "All"}
          />
          <label className="text-gray-700 text-lg">{year}</label>
        </div>
      ))}
    </div>
  </div>
  <button
    onClick={toggleEventTypeModal}
    className="text-sm text-white bg-purple-600 hover:bg-purple-700 rounded-md px-3 py-1"
  >
    Specify Event Types
  </button>
</div>

{/* Modal for selecting event types */}
{isEventTypeModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white w-[80%] max-w-lg rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">
        Select Event Types
      </h2>
      <input
        type="text"
        placeholder="Search event types"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <div className="max-h-64 overflow-y-auto">
        {filteredEventTypes.map((type) => (
          <div
            key={type}
            className="flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded"
            onClick={() => handleEventTypeSelection(type)}
          >
            <input
              type="checkbox"
              checked={selectedEventTypes.includes(type)}
              onChange={() => handleEventTypeSelection(type)}
              className="form-checkbox h-4 w-4 text-green-600 mr-2"
            />
            <span>{type}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={toggleEventTypeModal}
          className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
<div className="text-center mb-4 flex items-center space-x-4">
  {showIcons && (
    <>
      <FaFilePdf
        size={34}
        color="#7312f1d3"
        onClick={handleGeneratePDF}
        className="cursor-pointer hover:scale-105 transition-transform duration-300"
      />
      <FaFileExcel
        size={34}
        color="#7312f1d3"
        onClick={downloadExcelReport}
        className="cursor-pointer hover:scale-105 transition-transform duration-300"
      />
    </>
  )}
  <button
    type="button"
    onClick={handleDownloadClick}
    className="focus:outline-none text-white bg-[#7312f1d3] hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-md text-sm px-3 py-1.5 mb-2 transition-all duration-300"
  >
    {showIcons ? "Hide" : "Download"}
  </button>
</div>
</div>