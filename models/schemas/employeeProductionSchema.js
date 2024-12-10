import Joi from "joi";
import productSchema from "./productSchema.js";


const employeeProductionSchema = Joi.object({
    employeeName: Joi.string().required(),
    products: Joi.array().items(productSchema).optional(),
    totalItemsProduced: Joi.number().integer().required(),
});

export default employeeProductionSchema;