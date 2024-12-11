import customerService from "../services/customerService.js";
import customerSchema from "../models/schemas/customerSchema.js";
import loyalCustomersSchema from "../models/schemas/loyalCustomersSchema.js";
import { validateSchema } from "../utils/validationUtils.js";

const saveCustomer = async (req, res) => {
    const { error } = validateSchema(req.body, customerSchema);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const customer = await customerService.saveCustomer(req.body);
        res.status(201).json(customer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const findCustomers = async (req, res) => {
    try {
        const customers = await customerService.findCustomers();
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const customersLoyaltyValue = async (req, res) => {
    try {
        const loyaltyAnalysis = await customerService.customersLoyaltyValue();

        const validationResults = loyaltyAnalysis.map(item => {
            const { error, value } = loyalCustomersSchema.validate(item);
            if (error) throw new Error(error.details[0].message);
            return value;
        });

        res.status(200).json(validationResults);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default { saveCustomer, findCustomers, customersLoyaltyValue };