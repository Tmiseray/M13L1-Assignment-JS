import Joi from "joi";

const productionSchema = Joi.object({
    productId: Joi.number().integer().positive().required()
        .messages({
            "any.required": "Product ID is required.",
            "number.base": "Product ID must be a number.",
            "number.integer": "Product ID must be an integer.",
            "number.positive": "Product ID must be a positive number.",
        }),
    quantityProduced: Joi.number().integer().min(1).required()
        .messages({
            "any.required": "Quantity produced is required.",
            "number.base": "Quantity produced must be a number.",
            "number.integer": "Quantity produced must be an integer.",
            "number.min": "Quantity produced must be at least 1.",
        }),
    dateProduced: Joi.date().iso().required()
        .messages({
            "any.required": "Date produced is required.",
            "date.base": "Date produced must be a valid date.",
            "date.format": "Date produced must be in ISO format (YYYY-MM-DD).",
        }),
});


export default productionSchema;
