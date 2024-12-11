import productionService from "../services/productionService.js";
import productionSchema from "../models/schemas/productionSchema.js";
import { validateSchema } from "../utils/validationUtils.js";


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

const findProductions = async (req, res) => {
    try {
        const productions = await productionService.findProductions();
        res.status(200).json(productions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default { saveProduction, findProductions };