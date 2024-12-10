import e from "express";
import orderController from "../controllers/orderController.js";

const router = e.Router();

// Save a new Order
router.post('/', orderController.saveOrder);

// Get all Orders
router.get('/', orderController.findOrders);

// Pagination
router.get('/paginate', orderController.findOrdersPaginate);

export default router;
