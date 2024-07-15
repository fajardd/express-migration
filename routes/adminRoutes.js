const express = require("express");
const adminController = require("../controller/adminController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/admin", authenticateToken, adminController.getAdmins);
router.get("/admin/:id", authenticateToken, adminController.getAdminDetail);
router.post("/admin", authenticateToken, adminController.createAdmin);
router.put("/admin/:id", authenticateToken, adminController.updateAdmin);
router.delete("/admin/:id", authenticateToken, adminController.deleteAdmin);

module.exports = router;
