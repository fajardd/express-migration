const express = require("express");
const customerController = require("../controller/customerController");
const authenticationToken = require("../middleware/authMiddleware");
const router = express.Router();

// Get customer
router.get("/customer", authenticationToken, customerController.getCustomers);

module.exports = router;
