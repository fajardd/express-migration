const express = require("express");
const serviceController = require("../controller/serviceController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/services", authenticateToken, serviceController.getAllServices);
router.post("/services", authenticateToken, serviceController.createService);
router.put("/services/:id", authenticateToken, serviceController.updateService);
router.delete(
  "/services/:id",
  authenticateToken,
  serviceController.deleteService
);

module.exports = router;
