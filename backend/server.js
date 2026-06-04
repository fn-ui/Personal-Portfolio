require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const projectRoutes = require("./routes/projectRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const viewRoutes = require("./routes/viewRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();
const server = http.createServer(app);

// ==========================
// MIDDLEWARE
// ==========================
app.use(cors({ origin: "*" }));
app.use(express.json());

// ==========================
// SOCKET.IO SETUP
// ==========================
const io = new Server(server, {
  cors: { origin: "*" },
});

app.set("io", io);

// ==========================
// SOCKET CONNECTION
// ==========================
io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);

  // Optional: send a handshake event
  socket.emit("socket:connected", {
    message: "Connected to notification server",
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// ==========================
// ROUTES
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/views", viewRoutes);

// 🔔 NOTIFICATIONS ROUTE (PRODUCTION READY)
app.use("/api/notifications", notificationRoutes);

// ==========================
// HEALTH CHECK
// ==========================
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ==========================
// DATABASE CONNECTION
// ==========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ==========================
// SERVER START
// ==========================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});