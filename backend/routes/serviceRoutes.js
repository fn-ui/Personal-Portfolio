const express = require("express");
const serviceController = require("../controllers/serviceController");
const { verifyToken, isAdmin } = require("../middleware/auth");
const { validateService } = require("../middleware/validation");

const router = express.Router();

router.get("/", serviceController.getServices);
router.post("/", verifyToken, isAdmin, validateService, serviceController.createService);
router.put("/:id", verifyToken, isAdmin, validateService, serviceController.updateService);
router.delete("/:id", verifyToken, isAdmin, serviceController.deleteService);

module.exports = router;
