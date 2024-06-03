const express = require("express");
const roleController = require("../controller/roleController");
const router = express.Router();

router.get("/roles", roleController.getAllRoles);
router.get("/roles/:id", roleController.getRoleById);
router.post("/roles", roleController.createRole);

module.exports = router;
