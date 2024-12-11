import Joi from "joi";

const employeeProductionSchema = Joi.object({
    employeeName: Joi.string().required(),
    totalItemsProduced: Joi.number().integer().required()
});

export default employeeProductionSchema;