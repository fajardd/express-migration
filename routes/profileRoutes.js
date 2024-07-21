const express = require("express");
const profileController = require("../controller/web/v1/profileController");
const authenticationToken = require("../middleware/authMiddleware");
const router = express.Router();

// Get profile
router.get(
  "/web/v1/profile",
  authenticationToken,
  profileController.getProfile
);
router.put(
  "/web/v1/profile",
  authenticationToken,
  profileController.updateProfile
);

module.exports = router;
