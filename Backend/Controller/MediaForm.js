const MediaRequirements = require("../Schema/MedaiRequirements");
exports.createRequirement = async (req, res) => {
  try {
    const {
      eventPoster = [],
      videos = [],
      onStageRequirements = [],
      receptionTVStreamingRequirements = [],
      communication = [],
      flexBanners = [],
      cameraAction = { photography: false, videography: false },
    } = req.body;

    const requirement = new MediaRequirements({
      eventPoster,
      videos,
      onStageRequirements,
      receptionTVStreamingRequirements,
      communication,
      flexBanners,
      cameraAction,
    });

    await requirement.save();
    res
      .status(201)
      .json({ message: "Requirement created successfully", requirement });
  } catch (error) {
    res.status(500).json({ message: "Error creating requirement", error });
  }
};

exports.getRequirements = async (req, res) => {
  try {
    const requirements = await MediaRequirements.find();
    res.status(200).json(requirements);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requirements", error });
  }
};

exports.getRequirementById = async (req, res) => {
  try {
    const requirement = await MediaRequirements.findById(req.params.id);
    if (!requirement)
      return res.status(404).json({ message: "Requirement not found" });
    res.status(200).json(requirement);
  } catch (error) {
    res.status(500).json({ message: "Error fetching requirement", error });
  }
};

// Update a requirement
exports.updateRequirement = async (req, res) => {
  try {
    const {
      eventPoster,
      videos,
      onStageRequirements,
      receptionTVStreamingRequirements,
      communication,
      flexBanners,
      cameraAction,
    } = req.body;

    const updatedRequirement = await MediaRequirements.findByIdAndUpdate(
      req.params.id,
      {
        eventPoster,
        videos,
        onStageRequirements,
        receptionTVStreamingRequirements,
        communication,
        flexBanners,
        cameraAction,
      },
      { new: true }
    );

    if (!updatedRequirement)
      return res.status(404).json({ message: "Requirement not found" });
    res.status(200).json({
      message: "Requirement updated successfully",
      updatedRequirement,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating requirement", error });
  }
};

exports.deleteRequirement = async (req, res) => {
  try {
    const deletedRequirement = await MediaRequirements.findByIdAndDelete(
      req.params.id
    );
    if (!deletedRequirement)
      return res.status(404).json({ message: "Requirement not found" });
    res.status(200).json({ message: "Requirement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting requirement", error });
  }
};
