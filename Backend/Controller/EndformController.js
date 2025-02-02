const Endform = require("../Schema/EndForm");
const BasicEvent = require("../Schema/EventSchema");
const transport = require("../Schema/transportform/main");
const amenityform = require("../Schema/foodform/main");
const communicationform = require("../Schema/MedaiRequirements");
const guestroomform = require("../Schema/guestroom/main");
exports.createEndform = async (req, res) => {
  try {
    const {
      iqacno,
      eventdata,
      transportform,
      amenityform,
      guestform,
      communicationform,
    } = req.body;
    console.log(
      "req.body of the end form :",
      iqacno,
      eventdata,
      transportform,
      amenityform,
      guestform,
      communicationform
    );
    const newEndform = new Endform({
      iqacno,
      eventdata,
      transportform,
      amenityform,
      communicationform,
      guestform,
    });
    const savedEndform = await newEndform.save();
    console.log("endform data : ", savedEndform);
    res.status(201).json({
      message: "Endform created successfully!",
      data: savedEndform,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create Endform" });
  }
};
exports.getAllEndforms = async (req, res) => {
  try {
    const endforms = await Endform.find();
    res.status(200).json(endforms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch Endforms" });
  }
};
exports.getOverallPendingEndforms = async (req, res) => {
  try {
    const endforms = await Endform.find({ status: "Pending" });
    if (!endforms || endforms.length === 0) {
      return res.status(404).json({ message: "No pending endforms found" });
    }

    const populatedEndforms = await Promise.all(
      endforms.map(async (endform) => {
        const populatedData = {};

        if (endform.eventdata) {
          populatedData.basicEvent = await BasicEvent.findById(
            endform.eventdata
          );
        }
        if (endform.transportform && endform.transportform.length > 0) {
          populatedData.transport = await transport.find({
            _id: { $in: endform.transportform },
          });
        }
        if (endform.amenityform) {
          populatedData.foodform = await amenityform.findById(
            endform.amenityform
          );
        }
        if (endform.guestform) {
          populatedData.guestroom = await guestroomform.findById(
            endform.guestform
          );
        }
        if (endform.communicationform) {
          populatedData.communicationdata = await communicationform.findById(
            endform.communicationform
          );
        }

        return {
          ...endform.toObject(),
          ...populatedData,
        };
      })
    );

    const validPopulatedEndforms = populatedEndforms.filter(
      (endform) => endform !== null
    );
    res.status(200).json(validPopulatedEndforms);
  } catch (error) {
    console.error("Error fetching pending endforms:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch overall pending Endforms" });
  }
};

exports.updateEndform = async (req, res) => {
  try {
    const updatedEndform = await Endform.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEndform) {
      return res.status(404).json({ message: "Endform not found" });
    }

    res.status(200).json({
      message: "Endform updated successfully",
      data: updatedEndform,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update Endform" });
  }
};
exports.deleteEndform = async (req, res) => {
  try {
    const deletedEndform = await Endform.findByIdAndDelete(req.params.id);
    if (!deletedEndform) {
      return res.status(404).json({ message: "Endform not found" });
    }
    res.status(200).json({ message: "Endform deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete Endform" });
  }
};
