import Joi from "joi";

const userSchema = Joi.object({
    username: Joi.string().min(3).max(255).required()
        .messages({
            "any.required": "Username is required.",
            "string.min": "Username must be at least 3 characters long.",
            "string.max": "Username cannot be longer than 255 characters.",
        }),
    password: Joi.string().min(6).max(255).required()
        .messages({
            "any.required": "Password is required.",
            "string.min": "Password must be at least 6 characters long.",
            "string.max": "Password cannot be longer than 255 characters.",
        }),
    role: Joi.string().valid('admin', 'user').required()
        .messages({
            "any.required": "Role is required.",
            "any.only": "Role must be either 'admin' or 'user'.",
        }),
    accountId: Joi.number().integer().positive().required()
        .messages({
            "any.required": "Account ID is required.",
            "number.base": "Account ID must be a number.",
            "number.positive": "Account ID must be a positive number.",
        }),
});

export default userSchema;