const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");
const Message = require("../models/Message");
const Notification = require("../models/Notification");
const sendEmail = require("../utils/sendEmail");
const { verifyToken, isAdmin } = require("../middleware/auth");
const { validateMessage } = require("../middleware/validation");

router.post("/", validateMessage, async (req, res, next) => {
  try {
    await messageController.createMessage(req, res, next);

    const io = req.app.get("io");
    const notification = await Notification.create({
      type: "info",
      text: `${req.body.name.trim()} sent you a message`,
      read: false,
    });

    if (io) {
      io.emit("new_message", {
        name: req.body.name.trim(),
        email: req.body.email.trim().toLowerCase(),
      });
      io.emit("notification:new", notification);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/", verifyToken, isAdmin, messageController.getMessages);
router.get("/stats/all", verifyToken, isAdmin, messageController.getStats);
router.get("/:id", verifyToken, isAdmin, messageController.getMessage);

router.patch(
  "/:id/status",
  verifyToken,
  isAdmin,
  messageController.updateMessageStatus
);

router.post("/:id/reply", verifyToken, isAdmin, async (req, res, next) => {
  try {
    const subject = req.body.subject?.trim();
    const replyMessage = req.body.message?.trim();

    if (!subject || !replyMessage) {
      return res.status(400).json({
        success: false,
        message: "Subject and message required",
      });
    }

    const msg = await Message.findById(req.params.id);

    if (!msg) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    msg.replies.push({ subject, message: replyMessage });
    msg.status = "Replied";
    await msg.save();

    await sendEmail({
      to: msg.email,
      subject,
      message: replyMessage,
    });

    const io = req.app.get("io");

    if (io) {
      io.emit("message_updated", msg);

      const notification = await Notification.create({
        type: "success",
        text: `You replied to ${msg.name}`,
        read: false,
      });
      io.emit("notification:new", notification);
    }

    res.json({
      success: true,
      message: "Reply sent successfully",
      data: msg,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", verifyToken, isAdmin, async (req, res, next) => {
  try {
    await messageController.deleteMessage(req, res, next);

    const io = req.app.get("io");
    if (io) {
      io.emit("delete_message", req.params.id);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
