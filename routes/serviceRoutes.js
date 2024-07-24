const express = require("express");
const serviceController = require("../controller/web/v1/serviceController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/web/v1/service", authMiddleware, serviceController.getAllServices);
router.get(
  "/web/v1/service/:id",
  authMiddleware,
  serviceController.getServiceById
);
router.post("/web/v1/service", authMiddleware, serviceController.createService);
router.put(
  "/web/v1/service/:id",
  authMiddleware,
  serviceController.updateService
);
router.delete(
  "/web/v1/service/:id",
  authMiddleware,
  serviceController.deleteService
);

module.exports = router;
