const express = require("express");
const profileController = require("../controller/web/v1/profileController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Get profile
router.get("/web/v1/profile", authMiddleware, profileController.getProfile);
router.get(
  "/web/v1/profile/history",
  authMiddleware,
  profileController.getHistoryProfile
);
router.put("/web/v1/profile", authMiddleware, profileController.updateProfile);

module.exports = router;
