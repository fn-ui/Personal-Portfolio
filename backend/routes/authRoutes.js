const express = require("express");
const authController = require("../controllers/authController");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// POST /api/auth/login
router.post("/login", authController.login);

// POST /api/auth/refresh
router.post("/refresh", authController.refreshToken);

// GET /api/auth/verify
router.get("/verify", verifyToken, authController.verify);

module.exports = router;