import Joi from "joi";

const employeeSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    position: Joi.string().min(2).max(100).required(),
});

export default employeeSchema;