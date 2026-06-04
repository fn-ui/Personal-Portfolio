const Notification = require("../models/Notification");

// ==========================
// GET ALL NOTIFICATIONS
// ==========================
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(notifications);

  } catch (error) {
    console.log("❌ GET NOTIFICATIONS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};

// ==========================
// CREATE NOTIFICATION
// ==========================
const createNotification = async (req, res) => {
  try {
    const io = req.app.get("io");

    const {
      text,
      type = "info",
    } = req.body;

    // VALIDATION
    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Notification text is required",
      });
    }

    // CREATE
    const notification = await Notification.create({
      text,
      type,
      read: false,
    });

    // ==========================
    // REAL-TIME PUSH
    // ==========================
    if (io) {
      io.emit("notification:new", notification);
    }

    res.status(201).json(notification);

  } catch (error) {
    console.log("❌ CREATE NOTIFICATION ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create notification",
    });
  }
};

// ==========================
// MARK ONE AS READ
// ==========================
const markAsRead = async (req, res) => {
  try {
    const io = req.app.get("io");

    const updated = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        read: true,
      },
      {
        new: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    // ==========================
    // REAL-TIME UPDATE
    // ==========================
    if (io) {
      io.emit("notification:updated", updated);
    }

    res.json(updated);

  } catch (error) {
    console.log("❌ MARK AS READ ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update notification",
    });
  }
};

// ==========================
// MARK ALL AS READ
// ==========================
const markAllAsRead = async (req, res) => {
  try {
    const io = req.app.get("io");

    await Notification.updateMany(
      {},
      {
        read: true,
      }
    );

    // FETCH UPDATED LIST
    const notifications = await Notification.find()
      .sort({ createdAt: -1 });

    // ==========================
    // REAL-TIME UPDATE
    // ==========================
    if (io) {
      io.emit("notification:all-read", notifications);
    }

    res.json({
      success: true,
      message: "All notifications marked as read",
    });

  } catch (error) {
    console.log("❌ MARK ALL AS READ ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update notifications",
    });
  }
};

module.exports = {
  getNotifications,
  createNotification,
  markAsRead,
  markAllAsRead,
};