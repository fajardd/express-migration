const express = require("express");
const adminController = require("../controller/web/v1/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/web/v1/admin", authMiddleware, adminController.getAdmins);
router.get("/web/v1/admin/:id", authMiddleware, adminController.getAdminDetail);
router.post("/web/v1/admin", authMiddleware, adminController.createAdmin);
router.put(
  "/web/v1/admin/:id",
  authMiddleware,

  adminController.updateAdmin
);
router.delete("web/v1/admin/:id", authMiddleware, adminController.deleteAdmin);

module.exports = router;
