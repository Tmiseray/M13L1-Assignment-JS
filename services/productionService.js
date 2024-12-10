import Production from "../models/production.js";
import Employee from "../models/employee.js";
import { Op, fn, col } from "sequelize";
import Product from "../models/product.js";

// Save a new production record
const saveProduction = async (productionData) => {
    try {
        const production = await Production.create(productionData);
        return production;
    } catch (error) {
        throw new Error("Error saving the production: " + error.message);
    }
};

// Find all production records
const findProductions = async () => {
    try {
        const productions = await Production.findAll();
        return productions;
    } catch (error) {
        console.log(error);
        throw new Error("Error retrieving productions: " + error.message);
    }
};

// Group Productions/Totals by Employee Name
const employeesTotalProductions = async () => {
    try {
        const results = await Employee.findAll({
            attributes: [
                'name',
                [fn('SUM', col('Productions.quantityProduced')), 'totalItemsProduced'],
            ],
            include: [{
                model: Production,
                as: 'production',
                attributes: [],
                required: true,
                include: [{
                    model: Product,
                    as: 'product',
                    attributes: ['name'],
                    required: true,
                }],
                group: ['Production.productId'],
                where: {
                    [Op.eq]: col('Employee.id'),
                },
            }],
            group: ['Employee.id', 'Products.id'],
            raw: true,
        });

        return results.map(employee => ({
            employeeName: employee.name,
            totalItemsProduced: employee.totalItemsProduced,
            products: results.filter(result => result.employeeId === employee.id)
                .map(product => ({
                    productName: product['Products.name'],
                    quantityProduced: product['Productions.quantityProduced'],
                })),
        }));
    } catch (error) {
        throw new Error('Error fetching employee production data:' + error.message);
    }
};


export default { saveProduction, findProductions, employeesTotalProductions };