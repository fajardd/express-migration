const express = require("express");
const historyController = require("../controller/web/v1/historyController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get(
  "/web/v1/histories",
  authMiddleware,
  historyController.getAllHistory
);
router.get(
  "/web/v1/histories/:id_user",
  authMiddleware,
  historyController.getHistoryByIdUser
);
router.post(
  "/web/v1/histories",
  authMiddleware,
  historyController.createHistory
);
router.delete(
  "/web/v1/histories/:id",
  authMiddleware,
  historyController.deleteHistory
);

module.exports = router;
