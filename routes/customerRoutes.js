import e from "express";
import customerController from "../controllers/customerController.js";
import { verifyToken, requireRole } from '../utils/authUtils.js';
import cache from '../caching.js';

const router = e.Router();

// Save a New Customer
router.post('/', [
    verifyToken,
    requireRole('admin')
], customerController.saveCustomer);

// Get All Customers
router.get('/', [
    verifyToken,
    requireRole('admin'),
    cache.cacheMiddleware(60)
], customerController.findCustomers);

// Customers Loyalty Value
router.get('/lifetime-loyalty', [
    verifyToken,
    requireRole('admin'),
    cache.cacheMiddleware(60)
], customerController.customersLoyaltyValue);

export default router;