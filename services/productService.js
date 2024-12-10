import Product from "../models/product.js";

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
}

export default { saveProduct, findProducts, findProductsPaginate };