const express = require("express");
const router = express.Router();

const Message = require("../models/Message");
const sendEmail = require("../utils/sendEmail");

// ==========================
// CREATE MESSAGE
// ==========================
router.post("/", async (req, res) => {
  try {
    const msg = new Message(req.body);
    const saved = await msg.save();

    // 🔥 SOCKET: emit new message
    const io = req.app.get("io");
    if (io) io.emit("new_message", saved);

    res.json(saved);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create message",
    });
  }
});

// ==========================
// GET ALL MESSAGES
// ==========================
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
});

// ==========================
// DELETE MESSAGE
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);

    // 🔥 SOCKET: emit delete event
    const io = req.app.get("io");
    if (io) io.emit("delete_message", req.params.id);

    res.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete message",
    });
  }
});

// ==========================
// UPDATE MESSAGE STATUS
// ==========================
router.put("/:id", async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    // 🔥 SOCKET: emit update
    const io = req.app.get("io");
    if (io) io.emit("message_updated", updatedMessage);

    res.json(updatedMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to update message",
    });
  }
});

// ==========================
// REPLY TO MESSAGE
// ==========================
router.post("/reply/:id", async (req, res) => {
  try {
    const { subject, message } = req.body;

    const existingMessage = await Message.findById(req.params.id);

    if (!existingMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // Send email
    await sendEmail({
      to: existingMessage.email,
      subject,
      message,
    });

    // Save reply
    existingMessage.replies.push({
      subject,
      message,
    });

    // Update status
    existingMessage.status = "Replied";

    const updated = await existingMessage.save();

    // 🔥 SOCKET: emit updated message
    const io = req.app.get("io");
    if (io) io.emit("message_updated", updated);

    console.log("📧 EMAIL SENT + MESSAGE UPDATED");

    res.json({
      success: true,
      message: "Reply sent successfully",
    });

  } catch (error) {
    console.log("❌ EMAIL ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send reply",
    });
  }
});

module.exports = router;