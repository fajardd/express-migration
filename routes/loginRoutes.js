const express = require("express");
const loginController = require("../controller/loginController");
const router = express.Router();

// Post login
router.post("/login", loginController.login);

module.exports = router;
