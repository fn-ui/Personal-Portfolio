const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    // notification text
    text: {
      type: String,
      required: true,
      trim: true,
    },

    // notification category
    type: {
      type: String,
      enum: ["info", "success", "warning", "error"],
      default: "info",
    },

    // read status
    read: {
      type: Boolean,
      default: false,
    },

    // optional future multi-user support
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);