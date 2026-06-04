const express = require("express");
const router = express.Router();

const {
  getNotifications,
  createNotification,
  markAsRead,
  markAllAsRead,
} = require("../controllers/notificationsController");

// GET
router.get("/", getNotifications);

// POST
router.post("/", createNotification);

// PATCH single
router.patch("/:id/read", markAsRead);

// PATCH all
router.patch("/mark-all-read", markAllAsRead);

module.exports = router;