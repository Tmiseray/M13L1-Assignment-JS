import customerService from "../services/customerService.js";
import customerSchema from "../models/schemas/customerSchema.js";
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

export default { saveCustomer, findCustomers };