const express = require("express");
const skillController = require("../controllers/skillController");
const { verifyToken, isAdmin } = require("../middleware/auth");
const { validateSkill } = require("../middleware/validation");

const router = express.Router();

router.get("/", skillController.getSkills);
router.post("/", verifyToken, isAdmin, validateSkill, skillController.createSkill);
router.put("/:id", verifyToken, isAdmin, validateSkill, skillController.updateSkill);
router.delete("/:id", verifyToken, isAdmin, skillController.deleteSkill);

module.exports = router;
