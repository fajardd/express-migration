const express = require("express");
const profileController = require("../controller/profileController");
const authenticationToken = require("../middleware/authMiddleware");
const router = express.Router();

// Get profile
router.get("/profile", authenticationToken, profileController.getProfile);

module.exports = router;
