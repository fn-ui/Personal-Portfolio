const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const projectRoutes = require("./routes/projectRoutes");
const messageRoutes = require("./routes/messageRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors({
  origin: "http://localhost:5173", // Vite frontend (adjust if needed)
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   DEBUG (IMPORTANT)
========================= */
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

/* =========================
   API ROUTES
========================= */
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/testimonials", testimonialRoutes);

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/* =========================
   404 ROUTE
========================= */
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

/* =========================
   DATABASE + SERVER
========================= */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });