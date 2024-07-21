const express = require("express");
const customerController = require("../controller/web/v1/customerController");
const authenticationToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get(
  "/web/v1/customer",
  authenticationToken,
  customerController.getCustomers
);
router.get(
  "/web/v1/customer/:id",
  authenticationToken,
  customerController.getCustomerDetail
);
router.post(
  "/web/v1/customer",
  authenticationToken,
  customerController.createCustomer
);
router.put(
  "/web/v1/customer/:id",
  authenticationToken,
  customerController.updateCustomer
);
router.delete(
  "/web/v1/customer/:id",
  authenticationToken,
  customerController.deleteCustomer
);

module.exports = router;
