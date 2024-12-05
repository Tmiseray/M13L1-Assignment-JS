import Production from "../models/production.js";

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
        throw new Error("Error retrieving productions: " + error.message);
    }
};

export default { saveProduction, findProductions };