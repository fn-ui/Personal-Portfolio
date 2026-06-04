const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "123456";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (
    email !== ADMIN_EMAIL ||
    password !== ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

module.exports = router;