const express = require("express");
const router = express.Router();

const {
  getNotifications,
  createNotification,
  markAsRead,
  markAllAsRead,
} = require("../controllers/notificationsController");

// GET ALL NOTIFICATIONS
router.get("/", getNotifications);

// CREATE NOTIFICATION
router.post("/", createNotification);

// MARK SINGLE AS READ
router.patch("/:id/read", markAsRead);

// MARK ALL AS READ
router.patch("/mark-all-read", markAllAsRead);

module.exports = router;