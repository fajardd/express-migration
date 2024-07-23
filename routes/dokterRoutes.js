const express = require("express");
const dokterController = require("../controller/web/v1/dokterController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Get dokter
router.get(
  "/web/v1/veterinarian",
  authMiddleware,
  dokterController.getVeterinarians
);
router.get(
  "/web/v1/veterinarian/:id",
  authMiddleware,
  dokterController.getVeterinarianDetail
);
router.post(
  "/web/v1/veterinarian",
  authMiddleware,
  dokterController.createVeterinarian
);
router.put(
  "/web/v1/veterinarian/:id",
  authMiddleware,
  dokterController.updateVeterinarian
);
router.delete(
  "/web/v1/veterinarian/:id",
  authMiddleware,
  dokterController.deleteVeterinarian
);

module.exports = router;
