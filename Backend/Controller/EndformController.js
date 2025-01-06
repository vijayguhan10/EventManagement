const Endform = require('../Schema/EndForm');
exports.createEndform = async (req, res) => {
  try {
    const { iqacno, eventdata, transportform, amenityform, guestform } = req.body.events;
    console.log("req.body of the end form :",req.body)
    const newEndform = new Endform({
      iqacno,
      eventdata,
      transportform,
      amenityform,
      guestform
    })
    const savedEndform = await newEndform.save();
    console.log("endform data : ",savedEndform)
    res.status(201).json({
      message: 'Endform created successfully!',
      data: savedEndform
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create Endform' });
  }
};
exports.getAllEndforms = async (req, res) => {
  try {
    const endforms = await Endform.find();
    res.status(200).json(endforms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch Endforms' });
  }
};

exports.getEndformById = async (req, res) => {
  try {
    const endform = await Endform.findById(req.params.id);
    if (!endform) {
      return res.status(404).json({ message: 'Endform not found' });
    }
    res.status(200).json(endform);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch Endform' });
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
      return res.status(404).json({ message: 'Endform not found' });
    }

    res.status(200).json({
      message: 'Endform updated successfully',
      data: updatedEndform
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update Endform' });
  }
};

exports.deleteEndform = async (req, res) => {
  try {
    const deletedEndform = await Endform.findByIdAndDelete(req.params.id);
    if (!deletedEndform) {
      return res.status(404).json({ message: 'Endform not found' });
    }
    res.status(200).json({ message: 'Endform deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete Endform' });
  }
};
