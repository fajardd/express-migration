const express = require("express");
const scheduleController = require("../controller/scheduleController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

//schedule
router.get("/schedules", authenticateToken, scheduleController.getAllSchedule);
router.get(
  "/schedules/:id",
  authenticateToken,
  scheduleController.getScheduleById
);
router.post("/schedules", authenticateToken, scheduleController.createSchedule);
router.put(
  "/schedules/:id",
  authenticateToken,
  scheduleController.updateSchedule
);
router.delete(
  "/schedules/:id",
  authenticateToken,
  scheduleController.deleteSchedule
);

module.exports = router;
