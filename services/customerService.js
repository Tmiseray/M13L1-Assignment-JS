import { Customer, Order } from "../models/index.js";
import { col, fn } from "sequelize";

// Save a new customer
const saveCustomer = async (customerData) => {
    try {
        const newCustomer = await Customer.create(customerData);
        return newCustomer;
    } catch (error) {
        throw new Error("Error saving the customer: " + error.message);
    }
};

// Find all customers
const findCustomers = async () => {
    try {
        const customers = await Customer.findAll();
        return customers;
    } catch (error) {
        throw new Error("Error retrieving customers: " + error.message);
    }
};

// Customers Loyalty Value
const customersLoyaltyValue = async () => {
    try {
        const loyaltyValues = await Order.findAll({
            attributes: [
                [fn('SUM', col('totalPrice')), 'lifetimeLoyaltyValue'],
            ],
            include: [{
                model: Customer,
                as: 'customerOrder',
                attributes: ['name'],
            }],
            group: ['customerOrder.name'],
            raw: true,
        });

        return loyaltyValues.map(loyalty => ({
            customerName: loyalty['customerOrder.name'],
            lifetimeLoyaltyValue: loyalty.lifetimeLoyaltyValue,
        }));
    } catch (err) {
        throw new Error('Error fetching loyalty values: ' + err.message);
    }
};

export default { saveCustomer, findCustomers, customersLoyaltyValue };