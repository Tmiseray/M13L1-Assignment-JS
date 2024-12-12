import e from "express";
import productionController from "../controllers/productionController.js";

const router = e.Router();

// Save a New Production
router.post('/', productionController.saveProduction);

// Get All Productions
router.get('/', productionController.findProductions);

// Production Efficiency Analysis
router.get('/efficiency-analysis/:date', productionController.productionEfficiency);

export default router;