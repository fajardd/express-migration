const express = require("express");
const roleController = require("../controller/web/v1/roleController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/web/v1/roles", authMiddleware, roleController.getAllRoles);
router.get("/web/v1/roles/:id", authMiddleware, roleController.getRoleById);
router.post("/web/v1/roles", authMiddleware, roleController.createRole);

module.exports = router;
