const View = require("../models/View");

// GET views
const getViews = async (req, res) => {
  try {
    let doc = await View.findOne();

    if (!doc) {
      doc = await View.create({ count: 0, visitors: [] });
    }

    res.json(doc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// INCREMENT ONLY ONCE PER IP PER DAY
const incrementViews = async (req, res) => {
  try {
    let doc = await View.findOne();

    if (!doc) {
      doc = await View.create({ count: 0, visitors: [] });
    }

    const ip =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress;

    const today = new Date().toISOString().split("T")[0];

    const alreadyVisited = doc.visitors.find(
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

    res.json(doc);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getViews,
  incrementViews,
};