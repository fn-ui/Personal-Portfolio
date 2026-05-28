const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  subject: String,

  message: String,

  sentAt: {
    type: Date,
    default: Date.now,
  },
});

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    // MESSAGE STATUS
    status: {
      type: String,
      enum: ["New", "Replied", "Closed"],
      default: "New",
    },

    // ADMIN REPLIES
    replies: [replySchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);