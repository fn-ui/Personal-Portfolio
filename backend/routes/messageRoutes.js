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
    console.log("📩 Incoming message:", req.body);

    // CREATE MESSAGE
    const msg = new Message({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    const saved = await msg.save();

    console.log("✅ Message saved:", saved);

    // SOCKET INSTANCE
    const io = req.app.get("io");

    // ==========================
    // REALTIME MESSAGE EVENT
    // ==========================
    if (io) {
      io.emit("new_message", saved);
      console.log("📡 new_message emitted");
    }

    // ==========================
    // CREATE NOTIFICATION
    // ==========================
    const notification = await Notification.create({
      type: "info",
      text: `${saved.name} sent you a message`,
      read: false,
    });

    console.log("✅ Notification created:", notification);

    // ==========================
    // REALTIME NOTIFICATION EVENT
    // ==========================
    if (io) {
      io.emit("notification:new", notification);
      console.log("📡 notification:new emitted");
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: saved,
    });

  } catch (error) {
    console.log("❌ CREATE MESSAGE ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
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
      console.log("🗑️ delete_message emitted");
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
      console.log("✏️ message_updated emitted");
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
      type: "success",
      text: `You replied to ${existingMessage.name}`,
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

      console.log("📡 message_updated emitted");
      console.log("📡 notification:new emitted");
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
      error: error.message,
    });
  }
});

module.exports = router;