const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const sendEmail = require("../utils/sendEmail"); // ✅ MISSING FIX

// CREATE MESSAGE
router.post("/", async (req, res) => {
  const msg = new Message(req.body);
  const saved = await msg.save();
  res.json(saved);
});

// GET MESSAGES
router.get("/", async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ message: "deleted" });
});

// REPLY
router.post("/:id/reply", async (req, res) => {
  try {
    console.log("🔥 REPLY ROUTE HIT");

    const { message } = req.body;
    console.log("MESSAGE:", message);

    const msg = await Message.findById(req.params.id);

    if (!msg) {
      return res.status(404).json({ message: "Message not found" });
    }

    console.log("FOUND USER:", msg.email);

    // SAVE REPLY (optional but recommended)
    msg.replies.push({ message });
    await msg.save();

    // SEND EMAIL
    await sendEmail({
      to: msg.email,
      subject: "Reply from Portfolio",
      text: message,
    });

    console.log("📧 EMAIL FUNCTION CALLED");

    res.json({ message: "Reply sent successfully" });

  } catch (error) {
    console.log("❌ ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;