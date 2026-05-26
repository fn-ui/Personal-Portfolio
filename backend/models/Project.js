const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    techStack: String,
    githubLink: String,
    liveDemo: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);