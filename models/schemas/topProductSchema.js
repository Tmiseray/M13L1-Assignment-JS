import Joi from "joi";


const topProductSchema = Joi.object({
    productName: Joi.string().required(),
    totalItemsSold: Joi.number().integer().required(),
});


export default topProductSchema;