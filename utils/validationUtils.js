export const validateSchema = (data, schema) => {
    return schema.validate(data, { abortEarly: false });
};