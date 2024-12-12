import e from "express";
import productController from "../controllers/productController.js";

const router = e.Router();

// Save a New Product
router.post('/', productController.saveProduct);

// Get All Products
router.get('/', productController.findProducts);

// Paginate Products
router.get('/paginate', productController.findProductsPaginate);

// Top Selling Products
router.get('/top-selling-products', productController.topSellingProducts);

export default router;