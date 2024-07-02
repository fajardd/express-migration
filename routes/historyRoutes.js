const express = require("express");
const historyController = require("../controller/historyController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/histories", authenticateToken, historyController.getAllHistory);
router.get(
  "/histories/:id_user",
  authenticateToken,
  historyController.getHistoryByIdUser
);
router.post("/histories", authenticateToken, historyController.createHistory);

module.exports = router;
