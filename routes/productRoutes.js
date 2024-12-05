import e from "express";
import productController from "../controllers/productController.js";

const router = e.Router();

// Save a new Product
router.post('/', productController.saveProduct);

// Get all Products
router.get('/', productController.findProducts);

export default router;