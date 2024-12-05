import Customer from "../models/customer.js";

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

export default { saveCustomer, findCustomers };