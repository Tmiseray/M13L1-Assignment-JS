import Joi from "joi";

const employeeSchema = Joi.object({
    name: Joi.string().min(2).max(100).required()
        .messages({
            "any.required": "Employee name is required.",
            "string.min": "Employee name must be at least 2 characters long.",
            "string.max": "Employee name cannot be any longer than 100 characters.",
        }),
    position: Joi.string().min(2).max(100).required()
        .messages({
            "any.required": "Employee position is required.",
            "string.min": "Employee position must be at least 2 characters long.",
            "string.max": "Employee position cannot be any longer than 100 characters.",
        }),
});

export default employeeSchema;