import employeeService from "../services/employeeService.js";
import employeeSchema from "../models/schemas/employeeSchema.js";
import { validateSchema } from "../utils/validationUtils.js";

const saveEmployee = async (req, res) => {
    const { error } = validateSchema(req.body, employeeSchema);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const employee = await employeeService.saveemployee(req.body);
        res.status(201).json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const findEmployees = async (req, res) => {
    try {
        const employees = await employeeService.findEmployees();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default { saveEmployee, findEmployees };