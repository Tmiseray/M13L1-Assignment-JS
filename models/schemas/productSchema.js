import Joi from "joi";

const productSchema = Joi.object({
    name: Joi.string().min(2).max(100).required()
        .messages({
            "any.required": "Product name is required.",
            "string.min": "Product name must be at least 2 characters long.",
            "string.max": "Product name cannot be longer than 100 characters.",
        }),
    price: Joi.number().min(0.01).positive().required()
        .messages({
            "any.required": "Product price is required.",
            "number.min": "Product price must be at least 0.01.",
            "number.positive": "Product price must be a positive value.",
        }),
});

export default productSchema;