const express = require("express");
const dokterController = require("../controller/dokterController");
const authenticationToken = require("../middleware/authMiddleware");
const router = express.Router();

// Get dokter
router.get(
  "/veterinarian",
  authenticationToken,
  dokterController.getVeterinarians
);

module.exports = router;
