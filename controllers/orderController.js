import orderService from "../services/orderService.js";
import orderSchema from "../models/schemas/orderSchema.js";
import { validateSchema } from "../utils/validationUtils.js";


// Save New Order Data
const saveOrder = async (req, res) => {
    const { error } = validateSchema(req.body, orderSchema);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const order = await orderService.saveOrder(req.body);
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Get All Orders
const findOrders = async (req, res) => {
    try {
        const orders = await orderService.findOrders();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Paginate Orders
const findOrdersPaginate = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const perPage = Math.max(1, parseInt(req.query.perPage, 10) || 10);

        const offset = (page - 1) * perPage;

        const { rows: orders, count: totalItems } = await orderService.findOrdersPaginate(perPage, offset);

        const totalPages = Math.ceil(totalItems / perPage);

        res.status(200).json({
            orders,
            totalItems,
            totalPages,
            currentPage: page,
            perPage,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export default { saveOrder, findOrders, findOrdersPaginate };