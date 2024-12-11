import { col, fn } from "sequelize";
import { Order, Product } from "../models/index.js"

// Save a new product
const saveProduct = async (productData) => {
    try {
        const newProduct = await Product.create(productData);
        return newProduct;
    } catch (error) {
        throw new Error("Error saving the product: " + error.message);
    }
};

// Find all products
const findProducts = async () => {
    try {
        const products = await Product.findAll();
        return products;
    } catch (error) {
        throw new Error("Error retrieving products: " + error.message);
    }
};

// Pagination
const findProductsPaginate = async (perPage=10, offset=0) => {
    const products = await Product.findAndCountAll({
        limit: perPage,
        offset: offset,
        order: [['name', 'DESC']],
    });
    return products;
};

// Top Selling Product
const topSellingProducts = async () => {
    try {
        const products = await Order.findAll({
            attributes: [
                [fn('SUM', col('quantity')), 'totalItemsSold'],
            ],
            include: [{
                model: Product,
                as: 'orderedProduct',
                attributes: ['name'],
            }],
            group: ['orderedProduct.name'],
            raw: true,
        });

        return products.map(product => ({
            productName: product['orderedProduct.name'],
            totalItemsSold: product.totalItemsSold,
        }));
    } catch (err) {
        throw new Error('Error fetching top selling products: ' + err.message);
    }
};

export default { saveProduct, findProducts, findProductsPaginate, topSellingProducts };