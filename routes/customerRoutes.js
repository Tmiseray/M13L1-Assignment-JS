import e from "express";
import customerController from "../controllers/customerController.js";

const router = e.Router();

// Save a new customer
router.post('/', customerController.saveCustomer);

// Get all customers
router.get('/', customerController.findCustomers);

// Customers Loyalty Value
router.get('/lifetime-loyalty', customerController.customersLoyaltyValue);

export default router;