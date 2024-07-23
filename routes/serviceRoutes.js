const express = require("express");
const serviceController = require("../controller/web/v1/serviceController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get(
  "/web/v1/services",
  authMiddleware,
  serviceController.getAllServices
);
router.post(
  "/web/v1/services",
  authMiddleware,
  serviceController.createService
);
router.put(
  "/web/v1/services/:id",
  authMiddleware,
  serviceController.updateService
);
router.delete(
  "web/v1/services/:id",
  authMiddleware,
  serviceController.deleteService
);

module.exports = router;
