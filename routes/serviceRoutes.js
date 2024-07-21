const express = require("express");
const serviceController = require("../controller/web/v1/serviceController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get(
  "/web/v1/services",
  authenticateToken,
  serviceController.getAllServices
);
router.post(
  "/web/v1/services",
  authenticateToken,
  serviceController.createService
);
router.put(
  "/web/v1/services/:id",
  authenticateToken,
  serviceController.updateService
);
router.delete(
  "web/v1/services/:id",
  authenticateToken,
  serviceController.deleteService
);

module.exports = router;
