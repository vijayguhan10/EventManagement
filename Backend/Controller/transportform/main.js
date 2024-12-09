const TransportRequest = require("../../Schema/transportform/main");
const createTransportRequest = async (req, res) => {
  var newRequest = new TransportRequest({
    ...req.body,
    basicDetails: {
      ...req.body.basicDetails,
      requisitionDate: new Date(req.body.basicDetails.requisitionDate),
    },
    travelDetails: {
      ...req.body.travelDetails,
      pickUpDateTime: new Date(req.body.travelDetails.pickUpDateTime),
      dropDateTime: new Date(req.body.travelDetails.dropDateTime),
    },
  });
  console.log("consoling the teansport form : ", newRequest);
  try {
    await newRequest.save();

    res.status(201).json({
      message: "Transport request created successfully",
      data: newRequest,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({
      message: "Error creating transport request",
      error: error.message,
    });
  }
};

const getAllTransportRequests = async (req, res) => {
  try {
    const requests = await TransportRequest.find();
    res.status(200).json(requests);
  } catch (error) {
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