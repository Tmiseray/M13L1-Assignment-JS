import e from "express";
import customerController from "../controllers/customerController.js";

const router = e.Router();

// Save a New Customer
router.post('/', customerController.saveCustomer);

// Get All Customers
router.get('/', customerController.findCustomers);

// Customers Loyalty Value
router.get('/lifetime-loyalty', customerController.customersLoyaltyValue);

export default router;