const express = require("express");
const scheduleController = require("../controller/web/v1/scheduleController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

//schedule
router.get(
  "/web/v1/schedules",
  authMiddleware,
  scheduleController.getAllSchedule
);
router.get(
  "/web/v1/schedules/:id",
  authMiddleware,
  scheduleController.getScheduleById
);
router.post(
  "/web/v1/schedules",
  authMiddleware,
  scheduleController.createSchedule
);
router.put(
  "/web/v1/schedules/:id",
  authMiddleware,
  scheduleController.updateSchedule
);
router.delete(
  "/web/v1/schedules/:id",
  authMiddleware,
  scheduleController.deleteSchedule
);

module.exports = router;
