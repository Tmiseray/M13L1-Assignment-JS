import Joi from "joi";

const loyalCustomersSchema = Joi.object({
    customerName: Joi.string().required(),
    lifetimeLoyaltyValue: Joi.number().integer().required(),
});

export default loyalCustomersSchema;