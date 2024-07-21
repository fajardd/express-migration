const express = require("express");
const userController = require("../controller/web/v1/userController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

// USER
router.get("/web/v1/users", authenticateToken, userController.getAllUsers);
router.get("/web/v1/users/:id", authenticateToken, userController.getUserById);
router.post("/web/v1/users", authenticateToken, userController.createUser);
router.put("/web/v1/users/:id", authenticateToken, userController.updateUser);
router.delete(
  "/web/v1/users/:id",
  authenticateToken,
  userController.deleteUser
);

module.exports = router;
