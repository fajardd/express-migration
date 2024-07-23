const express = require("express");
const dropdownController = require("../controller/web/v1/dropdownController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get(
  "/web/v1/dropdown/dokter",
  authMiddleware,
  dropdownController.getDokterList
);
router.get(
  "/web/v1/dropdown/service",
  authMiddleware,
  dropdownController.getServiceList
);

module.exports = router;
