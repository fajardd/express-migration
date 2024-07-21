const express = require("express");
const loginController = require("../controller/web/v1/loginController");
const router = express.Router();

// Post login
router.post("/web/v1/login", loginController.login);

module.exports = router;
