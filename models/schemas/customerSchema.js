import Joi from "joi";


const customerSchema = Joi.object({
    name: Joi.string().min(2).max(100).required()
        .messages({
            "any.required": "Customer name is required.",
            "string.min": "Customer name must be at least 2 characters long.",
            "string.max": "Customer name cannot be any longer than 100 characters.",
        }),
    email: Joi.string().email().required()
        .messages({
            "any.required": "Customer email is required.",
            "string.email": "Customer email must be a valid email address.",
        }),
    phone: Joi.string().pattern(/^\+?[0-9\s\-().]{10,20}$/).required()
        .messages({
            "any.required": "Customer phone number is required.",
            "string.pattern.base": "Customer phone number must be 10-20 digits and may include spaces, dashes, or parentheses.",
        }),
});


export default customerSchema;