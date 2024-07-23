const express = require("express");
const userController = require("../controller/web/v1/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// USER
router.get("/web/v1/users", authMiddleware, userController.getAllUsers);
router.get("/web/v1/users/:id", authMiddleware, userController.getUserById);
router.post("/web/v1/users", authMiddleware, userController.createUser);
router.put("/web/v1/users/:id", authMiddleware, userController.updateUser);
router.delete("/web/v1/users/:id", authMiddleware, userController.deleteUser);

module.exports = router;
