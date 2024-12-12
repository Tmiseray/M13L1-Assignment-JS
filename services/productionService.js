import { col, fn, Op } from "sequelize";
import { Production, Product } from "../models/index.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js"
import timezone from "dayjs/plugin/timezone.js"

dayjs.extend(utc);
dayjs.extend(timezone);


// Save New Production Data
const saveProduction = async (productionData) => {
    try {
        const production = await Production.create(productionData);
        return production;
    } catch (error) {
        throw new Error("Error saving the production: " + error.message);
    }
};


// Get All Productions
const findProductions = async () => {
    try {
        const productions = await Production.findAll();
        return productions;
    } catch (error) {
        console.log(error);
        throw new Error("Error retrieving productions: " + error.message);
    }
};


// Production Efficiency
const productionEfficiency = async (date) => {
    try {
        const efficiencyValues = await Production.findAll({
            attributes: [
                [fn('SUM', col('quantityProduced')), 'quantityProducedOnDate'],
                'productId',
                ['dateProduced', 'productionDate']
            ],
            where: {
                dateProduced: {
                    [Op.eq]: date,
                },
            },
            include: [{
                model: Product,
                attributes: ['name', 'id'],
                as: 'productFromProduction',
            }],
            group: ['production.productId', 'production.dateProduced'],
            raw: true,
        });

        return efficiencyValues.map(value => ({
            productName: value['productFromProduction.name'],
            quantityProducedOnDate: value.quantityProducedOnDate,
            productionDate: dayjs(value.dateProduced).format('YYYY-MM-DD') ,
        }));
    } catch (err) {
        throw new Error('Error computing production efficiency: ' + err.message);
    }
};


export default { saveProduction, findProductions, productionEfficiency };