import Production from "../models/production.js";
import Employee from "../models/employee.js";
import { Op, fn, col } from "sequelize";
import Product from "../models/product.js";


const employeesTotalProductions = async () => {
    try {
        const results = await Employee.findAll({
            attributes: [
                ['name'],
            ],
            include: [{
                model: Production,
                as: 'production',
                attributes: [
                    'productId',
                    'quantityProduced',
                    [fn('SUM', col('quantityProduced')), 'totalItemsProduced'],
                    'updatedBy',
                ],
                required: true,
                group: ['production.updatedBy'],
                where: {
                    [Op.eq]: col('Employee.id'),
                },
                include: [{
                    model: Product,
                    as: 'product',
                    attributes: [
                        'id',
                        ['name', 'productName'],
                    ],
                    required: true,
                    group: ['product.id'],
                    where: {
                        [Op.eq]: col('production.productId'),
                    },
                }],
            }],
            group: ['Employee.name'],
            raw: true,
        });

        return results.map(employee => ({
            employeeName: employee.name,
            totalItemsProduced: employee.totalItemsProduced,
            products: employee.production.product.map(p => ({
                productName: p.productName,
                quantityProduced: p[Production.quantityProduced],
            })),
        }));
    } catch (error) {
        throw new Error('Error fetching employee production data:' + error.message);
    }
};