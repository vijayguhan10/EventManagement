const Endform = require("../Schema/EndForm");
const BasicEvent = require("../Schema/EventSchema");
const transport = require("../Schema/transportform/main");
const amenityform = require("../Schema/foodform/main");
const guestroomform = require("../Schema/guestroom/main");
exports.createEndform = async (req, res) => {
  try {
    const { iqacno, eventdata, transportform, amenityform, guestform } =
      req.body.events;
    console.log("req.body of the end form :", req.body);
    const newEndform = new Endform({
      iqacno,
      eventdata,
      transportform,
      amenityform,
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
exports.getEndformByIQAC = async (req, res) => {
  try {
    const { iqac } = req.body;
    const EventFind = await Endform.findOne({ iqacno: iqac });
    if (!EventFind) {
      return res.status(404).json({ message: "Event not found" });
    }
    const basicDetails = await BasicEvent.findById(EventFind.eventdata);
    const transportdata = await transport.find({
      _id: { $in: EventFind.transportform },
    });

    const amenitydata = await amenityform.findById(EventFind.amenityform);
    const guestroomdata = await guestroomform.findById(EventFind.guestform);

    const Allformdata = {
      basicEvent: basicDetails,
      transport: transportdata,
      foodform: amenitydata,
      guestroom: guestroomdata,
    };

    return res.status(200).json({ message: "Event fetched", Allformdata });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching events", error });
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
