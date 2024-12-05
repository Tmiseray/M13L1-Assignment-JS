import productService from "../services/productService.js";
import productSchema from "../models/schemas/productSchema.js";
import { validateSchema } from "../utils/validationUtils.js";

const saveProduct = async (req, res) => {
    const { error } = validateSchema(req.body, productSchema);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const product = await productService.saveProduct(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const findProducts = async (req, res) => {
    try {
        const products = await productService.findProducts();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default { saveProduct, findProducts };