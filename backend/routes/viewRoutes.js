const express = require("express");
const { getViews, incrementViews } = require("../controllers/viewController");

const router = express.Router();

router.get("/", getViews);
router.post("/increment", incrementViews);

module.exports = router;