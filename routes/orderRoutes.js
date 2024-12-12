import e from "express";
import orderController from "../controllers/orderController.js";

const router = e.Router();

// Save a New Order
router.post('/', orderController.saveOrder);

// Get All Orders
router.get('/', orderController.findOrders);

// Paginate Orders
router.get('/paginate', orderController.findOrdersPaginate);

export default router;
