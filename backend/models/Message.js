const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
    isRead: { type: Boolean, default: false },
    replies: [
      {
        message: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);