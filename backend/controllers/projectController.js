const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");

const projectFields = ["title", "description", "techStack", "githubLink", "liveDemo"];

function sanitizeProjectPayload(body) {
  return projectFields.reduce((payload, field) => {
    if (body[field] !== undefined) {
      payload[field] = typeof body[field] === "string" ? body[field].trim() : body[field];
    }
    return payload;
  }, {});
}

exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const projectData = sanitizeProjectPayload(req.body);

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "portfolio-projects",
      });
      projectData.image = result.secure_url;
    }

    const savedProject = await Project.create(projectData);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: savedProject,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const updateData = sanitizeProjectPayload(req.body);

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "portfolio-projects",
      });
      updateData.image = result.secure_url;
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      message: "Project updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const total = await Project.countDocuments();
    const projects = await Project.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      stats: {
        total,
        recent: projects,
      },
    });
  } catch (error) {
    next(error);
  }
};
