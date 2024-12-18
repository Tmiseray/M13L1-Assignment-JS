import e from "express";
import productController from "../controllers/productController.js";
import { verifyToken, requireRole } from '../utils/authUtils.js';
import cache from '../caching.js';

const router = e.Router();

// Save a New Product
router.post('/', [
    verifyToken,
    requireRole('admin'),
    cache.cacheMiddleware(60)
], productController.saveProduct);

// Get All Products
router.get('/', [
    cache.cacheMiddleware(60)
], productController.findProducts);

// Paginate Products
router.get('/paginate', [
    cache.cacheMiddleware(60)
], productController.findProductsPaginate);

// Top Selling Products
router.get('/top-selling-products', [
    cache.cacheMiddleware(60)
], productController.topSellingProducts);

export default router;