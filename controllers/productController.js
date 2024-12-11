import productService from "../services/productService.js";
import productSchema from "../models/schemas/productSchema.js";
import topProductSchema from "../models/schemas/topProductSchema.js";
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

const findProductsPaginate = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const perPage = Math.max(1, parseInt(req.query.perPage, 10) || 10);

        const offset = (page - 1) * perPage;

        const { rows: products, count: totalItems } = await productService.findProductsPaginate(perPage, offset);

        const totalPages = Math.ceil(totalItems / perPage);

        res.status(200).json({
            products,
            totalItems,
            totalPages,
            currentPage: page,
            perPage,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const topSellingProducts = async (req, res) => {
    try {
        const analysisData = await productService.topSellingProducts();

        const validationResults = analysisData.map(item => {
            const { error, value } = topProductSchema.validate(item);
            if (error) throw new Error(error.details[0].message);
            return value;
        });

        res.status(200).json(validationResults);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default { saveProduct, findProducts, findProductsPaginate, topSellingProducts };