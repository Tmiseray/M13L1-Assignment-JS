import { Customer, Order } from "../models/index.js";
import { col, fn, Op } from "sequelize";


// Save New Customer Data
const saveCustomer = async (customerData) => {
    try {
        const newCustomer = await Customer.create(customerData);
        return newCustomer;
    } catch (error) {
        throw new Error("Error saving the customer: " + error.message);
    }
};


// Get All Customers
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
            having: {
                lifetimeLoyaltyValue : {
                    [Op.gte]: 200,
                },
            },
            raw: true,
        });

        return loyaltyValues.map(loyalty => ({
            customerName: loyalty['customerOrder.name'],
            lifetimeLoyaltyValue: parseFloat(loyalty.lifetimeLoyaltyValue),
        }));
    } catch (err) {
        throw new Error('Error fetching loyalty values: ' + err.message);
    }
};


export default { saveCustomer, findCustomers, customersLoyaltyValue };