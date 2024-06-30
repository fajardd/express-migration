const express = require("express");
const userController = require("../controller/userController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

// LOGIN
router.post("/login", userController.login);

// USER
router.get("/users", authenticateToken, userController.getAllUsers);
router.get("/users/:id", authenticateToken, userController.getUserById);
router.post("/users", authenticateToken, userController.createUser);
router.put("/users/:id", authenticateToken, userController.updateUser);
router.delete("/users/:id", authenticateToken, userController.deleteUser);

// PROFILE
router.get("/profile", authenticateToken, userController.getProfile);

// ADMIN
router.get("/admin", authenticateToken, userController.getAdmins);

// VETERINARIAN
router.get("/veterinarian", authenticateToken, userController.getVeterinarians);

// CUSTOMER
router.get("/customer", authenticateToken, userController.getCustomers);

module.exports = router;
