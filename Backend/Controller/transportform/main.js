const TransportRequest = require("../../Schema/transportform/main");
const createTransportRequest = async (req, res) => {
  try {
    const transportRequests = req.body.events;
    // console.log("checking the data  : ", transportRequests);

    if (!Array.isArray(transportRequests) || transportRequests.length === 0) {
      return res.status(400).json({ error: "Invalid or empty data array" });
    }

    const formattedRequests = transportRequests.map((request) => {
      const { basicDetails, travelDetails, eventDetails, driverDetails } =
        request;

      if (!basicDetails || !travelDetails || !eventDetails || !driverDetails) {
        throw new Error("Missing required nested data in one of the requests.");
      }

      // Ensure pickUpDateTime is defined
      if (!travelDetails.pickUpDateTime) {
        throw new Error("Pick-up Date and Time is required.");
      }

      return {
        basicDetails: {
          departmentName: basicDetails.departmentName,
          designation: basicDetails.designation || "Not Provided",
          empId: basicDetails.empId,
          iqacNumber: basicDetails.iqacNumber,
          mobileNumber: basicDetails.mobileNumber || "Not Provided",
          requestorName: basicDetails.requestorName,
          requisitionDate: new Date(basicDetails.requisitionDate),
        },
        driverDetails: {
          mobileNumber: driverDetails.mobileNumber,
          name: driverDetails.name,
        },
        travelDetails: {
          pickUpDateTime: new Date(travelDetails.pickUpDateTime),
          dropDateTime: new Date(travelDetails.dropDateTime),
          numberOfPassengers: Number(travelDetails.numberOfPassengers) || 1,
          vehicleType: travelDetails.vehicleType,
          pickUpLocation: travelDetails.pickUpLocation,
          dropLocation: travelDetails.dropLocation,
          specialRequirements: travelDetails.specialRequirements,
        },
        eventDetails: {
          eventName: eventDetails.eventName,
          eventType: eventDetails.eventType || "General",
          travellerDetails: eventDetails.travellerDetails || "Not Provided",
        },
      };
    });

    console.log("formattedRequests : ", formattedRequests);
    const savedRequests = await TransportRequest.insertMany(formattedRequests);
    console.log("savedRequests: ,", savedRequests);
    res.status(201).json(savedRequests);
  } catch (error) {
    console.log("error : ", error);

    res.status(400).json({ error: error.message });
  }
};
const getAllTransportRequests = async (req, res) => {
  try {
    const requests = await TransportRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({
      message: "Error fetching transport requests",
      error: error.message,
    });
  }
};

const getTransportRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await TransportRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Transport request not found" });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching transport request",
      error: error.message,
    });
  }
};

const updateTransportRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRequest = await TransportRequest.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedRequest) {
      return res.status(404).json({ message: "Transport request not found" });
    }
    res.status(200).json({
      message: "Transport request updated successfully",
      data: updatedRequest,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating transport request",
      error: error.message,
    });
  }
};

// Delete a transport request
const deleteTransportRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRequest = await TransportRequest.findByIdAndDelete(id);
    if (!deletedRequest) {
      return res.status(404).json({ message: "Transport request not found" });
    }
    res.status(200).json({ message: "Transport request deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting transport request",
      error: error.message,
    });
  }
};

module.exports = {
  createTransportRequest,
  getAllTransportRequests,
  getTransportRequestById,
  updateTransportRequest,
  deleteTransportRequest,
};
