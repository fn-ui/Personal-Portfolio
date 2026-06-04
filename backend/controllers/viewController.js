const View = require("../models/View");

// GET views
const getViews = async (req, res) => {
  try {
    let doc = await View.findOne();

    if (!doc) {
      doc = await View.create({
        count: 0,
        visitors: [],
      });
    }

    res.json(doc);
  } catch (error) {
    console.error("GET VIEWS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// INCREMENT VIEWS
const incrementViews = async (req, res) => {
  try {
    let doc = await View.findOne();

    if (!doc) {
      doc = await View.create({
        count: 0,
        visitors: [],
      });
    }

    const source = req.body?.source;

    if (source !== "public") {
      return res.json(doc);
    }

    const rawIp =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "";

    const ip = rawIp.split(",")[0].trim();

    const today = new Date().toISOString().split("T")[0];

    if (!Array.isArray(doc.visitors)) {
      doc.visitors = [];
    }

    const alreadyVisited = doc.visitors.some(
      (v) => v.ip === ip && v.date === today
    );

    if (!alreadyVisited) {
      doc.count += 1;

      doc.visitors.push({
        ip,
        date: today,
      });

      await doc.save();
    }

    return res.json(doc);
  } catch (error) {
    console.error("INCREMENT VIEWS ERROR:", error);
    res.status(500).json({
      message: "Failed to increment views",
      error: error.message,
    });
  }
};

module.exports = {
  getViews,
  incrementViews,
};