const express = require("express");
const scheduleController = require("../controller/web/v1/scheduleController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

//schedule
router.get(
  "/web/v1/schedules",
  authenticateToken,
  scheduleController.getAllSchedule
);
router.get(
  "/web/v1/schedules/:id",
  authenticateToken,
  scheduleController.getScheduleById
);
router.post(
  "/web/v1/schedules",
  authenticateToken,
  scheduleController.createSchedule
);
router.put(
  "/web/v1/schedules/:id",
  authenticateToken,
  scheduleController.updateSchedule
);
router.delete(
  "/web/v1/schedules/:id",
  authenticateToken,
  scheduleController.deleteSchedule
);

module.exports = router;
