const mongoose = require("mongoose");

const EventRequirementSchema = new mongoose.Schema(
  {
    eventPoster: { type: [String], default: [] },
    videos: { type: [String], default: [] },
    onStageRequirements: { type: [String], default: [] },
    receptionTVStreamingRequirements: { type: [String], default: [] },
    communication: { type: [String], default: [] },
    flexBanners: { type: [String], default: [] },
    cameraAction: {
      photography: { type: Boolean, default: false },
      videography: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MediaRequirements", EventRequirementSchema);
