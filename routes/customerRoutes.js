const express = require("express");
const customerController = require("../controller/web/v1/customerController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/web/v1/customer", authMiddleware, customerController.getCustomers);
router.get(
  "/web/v1/customer/:id",
  authMiddleware,
  customerController.getCustomerDetail
);
router.post(
  "/web/v1/customer",
  authMiddleware,
  customerController.createCustomer
);
router.put(
  "/web/v1/customer/:id",
  authMiddleware,
  customerController.updateCustomer
);
router.delete(
  "/web/v1/customer/:id",
  authMiddleware,
  customerController.deleteCustomer
);

module.exports = router;
