const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "..", ".env"),
});
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});

const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const projectRoutes = require("./routes/projectRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const skillRoutes = require("./routes/skillRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const viewRoutes = require("./routes/viewRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.DATABASE_URL;
const allowedOrigins = [
  ...(process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.set("trust proxy", 1);
app.use(cors(corsOptions));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

const io = new Server(server, {
  cors: corsOptions,
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.emit("socket:connected", {
    message: "Connected to notification server",
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    service: "portfolio-api",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);

const requireDatabase = (_req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  return res.status(503).json({
    success: false,
    message: "Database is currently unavailable",
  });
};

app.use("/api/messages", requireDatabase, messageRoutes);
app.use("/api/projects", requireDatabase, projectRoutes);
app.use("/api/services", requireDatabase, serviceRoutes);
app.use("/api/skills", requireDatabase, skillRoutes);
app.use("/api/testimonials", requireDatabase, testimonialRoutes);
app.use("/api/views", requireDatabase, viewRoutes);
app.use("/api/notifications", requireDatabase, notificationRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

async function startServer() {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  if (!mongoUri) {
    console.warn(
      "MONGO_URI is not configured. Database-backed routes will be unavailable."
    );
    return;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.warn("Auth routes are still available.");
  }
}

startServer();
