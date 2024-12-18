import e from "express";
import orderController from "../controllers/orderController.js";
import { verifyToken, requireRole } from '../utils/authUtils.js';
import cache from '../caching.js';

const router = e.Router();

// Save a New Order
router.post('/', [
    verifyToken,
    requireRole('admin')
], orderController.saveOrder);

// Get All Orders
router.get('/', [
    verifyToken,
    requireRole('admin'),
    cache.cacheMiddleware(60)
], orderController.findOrders);

// Paginate Orders
router.get('/paginate', [
    verifyToken,
    requireRole('admin'),
    cache.cacheMiddleware(60)
], orderController.findOrdersPaginate);

export default router;
