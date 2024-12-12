import Joi from "joi";

const orderSchema = Joi.object({
    customerId: Joi.number().integer().positive().required()
        .messages({
            "any.required": "Customer ID is required.",
            "number.base": "Customer ID must be a number.",
            "number.positive": "Customer ID must be a positive number.",
        }),
    productId: Joi.number().integer().positive().required()
        .messages({
            "any.required": "Product ID is required.",
            "number.base": "Product ID must be a number.",
            "number.positive": "Product ID must be a positive number.",
        }),
    quantity: Joi.number().integer().min(1).required()
        .messages({
            "any.required": "Quantity is required.",
            "number.base": "Quantity must be a number.",
            "number.min": "Quantity must be at least 1.",
        }),
    totalPrice: Joi.number().precision(2).min(0).optional()
        .messages({
            "number.base": "Total price must be a number.",
            "number.min": "Total price cannot be negative.",
        }),
});


export default orderSchema;