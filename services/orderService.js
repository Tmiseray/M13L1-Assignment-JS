import { Order } from "../models/index.js";


// Save New Order Data
const saveOrder = async (orderData) => {
    try {
        const newOrder = await Order.create(orderData);
        return newOrder;
    } catch (error) {
        throw new Error("Error saving the Order: " + error.message);
    }
};

// Get All Orders
const findOrders = async () => {
    try {
        const orders = await Order.findAll();
        return orders;
    } catch (error) {
        throw new Error("Error retrieving Orders: " + error.message);
    }
};

// Paginate Orders
const findOrdersPaginate = async (perPage=10, offset=0) => {
    const orders = await Order.findAndCountAll({
        limit: perPage,
        offset: offset,
        order: [['createdAt', 'DESC']],
    });
    return orders;
}


export default { saveOrder, findOrders, findOrdersPaginate }