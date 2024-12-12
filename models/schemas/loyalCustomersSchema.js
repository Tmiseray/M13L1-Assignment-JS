import Joi from "joi";


const loyalCustomersSchema = Joi.object({
    customerName: Joi.string().required(),
    lifetimeLoyaltyValue: Joi.number().precision(2).required(),
});


export default loyalCustomersSchema;