const Notification = require("../models/Notification");

// GET ALL
const getNotifications = async (req, res) => {
  const notifications = await Notification.find()
    .sort({ createdAt: -1 })
    .limit(50);

  res.json(notifications);
};

// CREATE
const createNotification = async (req, res) => {
  const io = req.app.get("io");

  const { title, message, type } = req.body;

  const notification = await Notification.create({
    title,
    message,
    type,
  });

  // REALTIME PUSH
  io.emit("notification:new", notification);

  res.status(201).json(notification);
};

// MARK ONE AS READ
const markAsRead = async (req, res) => {
  const io = req.app.get("io");

  const updated = await Notification.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );

  io.emit("notification:updated", updated);

  res.json(updated);
};

// MARK ALL AS READ
const markAllAsRead = async (req, res) => {
  const io = req.app.get("io");

  await Notification.updateMany({}, { read: true });

  io.emit("notification:all-read");

  res.json({ message: "All marked as read" });
};

module.exports = {
  getNotifications,
  createNotification,
  markAsRead,
  markAllAsRead,
};