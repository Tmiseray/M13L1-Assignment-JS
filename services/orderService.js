import Order from "../models/order.js";

// Save a new Order
const saveOrder = async (orderData) => {
    try {
        const newOrder = await Order.create(orderData);
        return newOrder;
    } catch (error) {
        throw new Error("Error saving the Order: " + error.message);
    }
};

// Find all Orders
const findOrders = async () => {
    try {
        const orders = await Order.findAll();
        return orders;
    } catch (error) {
        throw new Error("Error retrieving Orders: " + error.message);
    }
};

export default { saveOrder, findOrders }