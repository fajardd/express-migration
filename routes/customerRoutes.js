const express = require("express");
const customerController = require("../controller/customerController");
const authenticationToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/customer", authenticationToken, customerController.getCustomers);
router.get(
  "/customer/:id",
  authenticationToken,
  customerController.getCustomerDetail
);
router.post(
  "/customer",
  authenticationToken,
  customerController.createCustomer
);
router.put(
  "/customer/:id",
  authenticationToken,
  customerController.updateCustomer
);
router.delete(
  "/customer/:id",
  authenticationToken,
  customerController.deleteCustomer
);

module.exports = router;
