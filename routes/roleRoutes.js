const express = require("express");
const roleController = require("../controller/roleController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/roles", authenticateToken, roleController.getAllRoles);
router.get("/roles/:id", authenticateToken, roleController.getRoleById);
router.post("/roles", authenticateToken, roleController.createRole);

module.exports = router;
