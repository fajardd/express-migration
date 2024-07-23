const express = require("express");
const dropdownController = require("../controller/web/v1/dropdownController");
const authenticationToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get(
  "/web/v1/dropdown/dokter",
  authenticationToken,
  dropdownController.getDokterList
);
router.get(
  "/web/v1/dropdown/service",
  authenticationToken,
  dropdownController.getServiceList
);

module.exports = router;
