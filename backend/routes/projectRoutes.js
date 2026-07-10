const express = require("express");
const router = express.Router();

const projectController = require("../controllers/projectController");
const upload = require("../middleware/upload");
const { verifyToken, isAdmin } = require("../middleware/auth");
const { validateProject } = require("../middleware/validation");

router.get("/", projectController.getProjects);
router.get("/stats/all", verifyToken, isAdmin, projectController.getStats);
router.get("/:id", projectController.getProject);

router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"),
  validateProject,
  projectController.createProject
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  upload.single("image"),
  validateProject,
  projectController.updateProject
);

router.delete("/:id", verifyToken, isAdmin, projectController.deleteProject);

module.exports = router;
