import orderService from "../services/orderService.js";
import orderSchema from "../models/schemas/orderSchema.js";
import { validateSchema } from "../utils/validationUtils.js";

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

const findOrders = async (req, res) => {
    try {
        const orders = await orderService.findOrders();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default { saveOrder, findOrders };