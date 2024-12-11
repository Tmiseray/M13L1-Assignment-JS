import e from "express";
import productionController from "../controllers/productionController.js";

const router = e.Router();

// Save a new Production
router.post('/', productionController.saveProduction);

// Get all Productions
router.get('/', productionController.findProductions);

export default router;