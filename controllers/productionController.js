import productionService from "../services/productionService.js";
import productionSchema from "../models/schemas/productionSchema.js";
import { validateSchema } from "../utils/validationUtils.js";
import productionEfficiencySchema from "../models/schemas/productionEfficiencySchema.js";


// Save New Production Data
const saveProduction = async (req, res) => {
    const { error } = validateSchema(req.body, productionSchema);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const production = await productionService.saveProduction(req.body);
        res.status(201).json(production);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Get All Productions
const findProductions = async (req, res) => {
    try {
        const productions = await productionService.findProductions();
        res.status(200).json(productions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Production Efficiency Analysis
const productionEfficiency = async (req, res) => {
    try {
        const { date } = req.params;
        if (!date) return res.status(400).json({ error: 'Date parameter is required.' });

        const analysisData = await productionService.productionEfficiency(date);

        const validationResults = analysisData.map(item => {
            const { error, value } = productionEfficiencySchema.validate(item);
            if (error) throw new Error(error.details[0].message);
            return value;
        });

        res.status(200).json(validationResults);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export default { saveProduction, findProductions, productionEfficiency };