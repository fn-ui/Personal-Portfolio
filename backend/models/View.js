const mongoose = require("mongoose");

const viewSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },

  visitors: [
    {
      ip: String,
      date: String,
    },
  ],
});

module.exports = mongoose.model("View", viewSchema);