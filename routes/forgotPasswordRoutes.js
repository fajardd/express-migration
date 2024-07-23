const express = require("express");
const forgotPasswordController = require("../controller/web/v1/forgotPasswordController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/forgot-password", forgotPasswordController.forgotPassword);
router.post("/verify-reset-code", forgotPasswordController.verifyResetCode);
router.post(
  "/reset-password",
  authenticateToken,
  forgotPasswordController.resetPassword
);

module.exports = router;
