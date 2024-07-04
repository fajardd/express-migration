const express = require("express");
const dokterController = require("../controller/dokterController");
const authenticationToken = require("../middleware/authMiddleware");
const router = express.Router();

// Get dokter
router.get(
  "/veterinarian",
  authenticationToken,
  dokterController.getVeterinarians
);
router.get(
  "/veterinarian/:id",
  authenticationToken,
  dokterController.getVeterinarianDetail
);
router.put(
  "/veterinarian/:id",
  authenticationToken,
  dokterController.updateVeterinarian
);
router.delete(
  "/veterinarian/:id",
  authenticationToken,
  dokterController.deleteVeterinarian
);

module.exports = router;
