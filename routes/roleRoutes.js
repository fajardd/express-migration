const express = require("express");
const roleController = require("../controller/web/v1/roleController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/web/v1/roles", authenticateToken, roleController.getAllRoles);
router.get("/web/v1/roles/:id", authenticateToken, roleController.getRoleById);
router.post("/web/v1/roles", authenticateToken, roleController.createRole);

module.exports = router;
