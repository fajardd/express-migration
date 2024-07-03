const express = require("express");
const adminController = require("../controller/adminController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

// Get admin
router.get("/admin", authenticateToken, adminController.getAdmins);

module.exports = router;
