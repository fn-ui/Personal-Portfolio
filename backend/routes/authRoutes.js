const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("FROM FRONTEND:", email, password);
  console.log("ENV:", ADMIN_EMAIL, ADMIN_PASSWORD);
  console.log("JWT:", process.env.JWT_SECRET);


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