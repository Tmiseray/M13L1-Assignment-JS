import e from "express";
import productionController from "../controllers/productionController.js";
import { verifyToken, requireRole } from '../utils/authUtils.js';
import cache from '../caching.js';

const router = e.Router();

// Save a New Production
router.post('/', [
    verifyToken,
    requireRole('admin')
], productionController.saveProduction);

// Get All Productions
router.get('/', [
    verifyToken,
    requireRole('admin'),
    cache.cacheMiddleware(60)
], productionController.findProductions);

// Production Efficiency Analysis
router.get('/efficiency-analysis/:date', [
    verifyToken,
    requireRole('admin'),
    cache.cacheMiddleware(60)
], productionController.productionEfficiency);

export default router;