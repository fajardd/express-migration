const express = require("express");
const userController = require("../controller/userController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/users", authenticateToken, userController.getAllUsers);
router.get("/users/:id", authenticateToken, userController.getUserById);
router.post("/users", authenticateToken, userController.createUser);
router.put("/users/:id", authenticateToken, userController.updateUser);
router.delete("/users/:id", authenticateToken, userController.deleteUser);
router.get("/profile", authenticateToken, userController.getProfile);
router.post("/login", userController.login);

module.exports = router;
