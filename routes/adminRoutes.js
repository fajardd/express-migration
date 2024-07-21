const express = require("express");
const adminController = require("../controller/web/v1/adminController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/web/v1/admin", authenticateToken, adminController.getAdmins);
router.get(
  "/web/v1/admin/:id",
  authenticateToken,
  adminController.getAdminDetail
);
router.post("/web/v1/admin", authenticateToken, adminController.createAdmin);
router.put("/web/v1/admin/:id", authenticateToken, adminController.updateAdmin);
router.delete(
  "web/v1/admin/:id",
  authenticateToken,
  adminController.deleteAdmin
);

module.exports = router;
