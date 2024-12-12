import Joi from "joi";

const productionEfficiencySchema = Joi.object({
    productName: Joi.string().required(),
    productionDate: Joi.date().iso().required(),
    quantityProducedOnDate: Joi.number().integer().required(),
});


export default productionEfficiencySchema;