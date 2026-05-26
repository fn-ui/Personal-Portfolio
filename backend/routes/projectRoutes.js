const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Project = require("../models/Project");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

/* =========================
   GET ALL PROJECTS
========================= */
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.log("GET ALL PROJECTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   GET SINGLE PROJECT
========================= */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid project ID format",
      });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.log("GET PROJECT ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    let imageUrl = "";

    // 🔥 SAFE CLOUDINARY UPLOAD
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "portfolio-projects",
      });

      imageUrl = result.secure_url;
    }

    const newProject = new Project({
      title: req.body.title,
      description: req.body.description,
      techStack: req.body.techStack,
      githubLink: req.body.githubLink,
      liveDemo: req.body.liveDemo,
      image: imageUrl,
    });

    const savedProject = await newProject.save();

    res.status(201).json(savedProject);
  } catch (error) {
    console.log("CREATE PROJECT ERROR:", error);
    res.status(500).json({
      message: error.message,
      error: error.toString(),
    });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      techStack: req.body.techStack,
      githubLink: req.body.githubLink,
      liveDemo: req.body.liveDemo,
    };

    // 🔥 SAFE IMAGE UPDATE
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "portfolio-projects",
      });

      updateData.image = result.secure_url;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updatedProject);
  } catch (error) {
    console.log("UPDATE PROJECT ERROR:", error);
    res.status(500).json({
      message: error.message,
      error: error.toString(),
    });
  }
});

/* =========================
   DELETE PROJECT
========================= */
router.delete("/:id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.log("DELETE PROJECT ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;