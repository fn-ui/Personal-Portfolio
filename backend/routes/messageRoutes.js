const express = require("express");
const router = express.Router();

const Message = require("../models/Message");
const Notification = require("../models/Notification");
const sendEmail = require("../utils/sendEmail");

// ==========================
// CREATE MESSAGE
// ==========================
router.post("/", async (req, res) => {
  try {
    // CREATE MESSAGE
    const msg = new Message(req.body);
    const saved = await msg.save();

    // SOCKET INSTANCE
    const io = req.app.get("io");

    // ==========================
    // REALTIME MESSAGE EVENT
    // ==========================
    if (io) {
      io.emit("new_message", saved);
    }

    // ==========================
    // CREATE NOTIFICATION
    // ==========================
    const notification = await Notification.create({
      title: "New Contact Message",
      message: `${saved.name} sent you a message`,
      type: "message",
      read: false,
    });

    // ==========================
    // REALTIME NOTIFICATION EVENT
    // ==========================
    if (io) {
      io.emit("notification:new", notification);
    }

    res.status(201).json(saved);

  } catch (error) {
    console.log("❌ CREATE MESSAGE ERROR:", error);

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
    const messages = await Message.find().sort({
      createdAt: -1,
    });

    res.json(messages);

  } catch (error) {
    console.log("❌ FETCH MESSAGES ERROR:", error);

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

    // SOCKET INSTANCE
    const io = req.app.get("io");

    // REALTIME DELETE EVENT
    if (io) {
      io.emit("delete_message", req.params.id);
    }

    res.json({
      success: true,
      message: "Message deleted successfully",
    });

  } catch (error) {
    console.log("❌ DELETE MESSAGE ERROR:", error);

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

    // SOCKET INSTANCE
    const io = req.app.get("io");

    // REALTIME UPDATE EVENT
    if (io) {
      io.emit("message_updated", updatedMessage);
    }

    res.json(updatedMessage);

  } catch (error) {
    console.log("❌ UPDATE MESSAGE ERROR:", error);

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

    const existingMessage = await Message.findById(
      req.params.id
    );

    // CHECK MESSAGE
    if (!existingMessage) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // ==========================
    // SEND EMAIL
    // ==========================
    await sendEmail({
      to: existingMessage.email,
      subject,
      message,
    });

    // ==========================
    // SAVE REPLY
    // ==========================
    existingMessage.replies.push({
      subject,
      message,
    });

    // UPDATE STATUS
    existingMessage.status = "Replied";

    const updated = await existingMessage.save();

    // ==========================
    // CREATE NOTIFICATION
    // ==========================
    const notification = await Notification.create({
      title: "Message Replied",
      message: `You replied to ${existingMessage.name}`,
      type: "system",
      read: false,
    });

    // SOCKET INSTANCE
    const io = req.app.get("io");

    // ==========================
    // REALTIME EVENTS
    // ==========================
    if (io) {
      io.emit("message_updated", updated);
      io.emit("notification:new", notification);
    }

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