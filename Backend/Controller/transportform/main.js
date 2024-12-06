const TransportRequest = require("../../Schema/transportform/main");
const createTransportRequest = async (req, res) => {
  try {
    const newRequest = new TransportRequest(req.body);
    await newRequest.save();
    res.status(201).json({
      message: "Transport request created successfully",
      data: newRequest,
    });
  } catch (error) {
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

// Fetch a single transport request by ID
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

// Update a transport request
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
