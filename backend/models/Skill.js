const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    items: [{ type: String, trim: true }],
    icon: { type: String, default: "Layers3", trim: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
