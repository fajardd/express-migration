const express = require("express");
const historyController = require("../controller/web/v1/historyController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get(
  "/web/v1/histories",
  authenticateToken,
  historyController.getAllHistory
);
router.get(
  "/web/v1/histories/:id_user",
  authenticateToken,
  historyController.getHistoryByIdUser
);
router.post(
  "/web/v1/histories",
  authenticateToken,
  historyController.createHistory
);
router.delete(
  "/web/v1/histories/:id",
  authenticateToken,
  historyController.deleteHistory
);

module.exports = router;
