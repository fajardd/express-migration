const express = require("express");
const dokterController = require("../controller/web/v1/dokterController");
const authenticationToken = require("../middleware/authMiddleware");
const router = express.Router();

// Get dokter
router.get(
  "/web/v1/veterinarian",
  authenticationToken,
  dokterController.getVeterinarians
);
router.get(
  "/web/v1/veterinarian/:id",
  authenticationToken,
  dokterController.getVeterinarianDetail
);
router.post(
  "/web/v1/veterinarian",
  authenticationToken,
  dokterController.createVeterinarian
);
router.put(
  "/web/v1/veterinarian/:id",
  authenticationToken,
  dokterController.updateVeterinarian
);
router.delete(
  "/web/v1/veterinarian/:id",
  authenticationToken,
  dokterController.deleteVeterinarian
);

module.exports = router;
