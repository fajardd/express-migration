const express = require("express");
const loginController = require("../controller/web/v1/loginController");
const loginAdminController = require("../controller/web/v1/loginController");
const router = express.Router();

// Post admin
router.post("/web/v1/login", loginAdminController.adminLogin);
// Post login
router.post("/mob/v1/login", loginController.login);

module.exports = router;
