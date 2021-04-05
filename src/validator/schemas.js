import Joi from 'joi';

export const userGetQuerySchema = Joi.object({
    query: Joi.string().required(),
    limit: Joi.number().required()
});

export const userCreateBodySchema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string()
        .required()
        .regex(/^[0-9a-zA-Z]+$/),
    age: Joi.number().required().min(4).max(130)
});

export const userUpdateBodySchema = Joi.object({
    login: Joi.string(),
    password: Joi.string().regex(/^[0-9a-zA-Z]+$/),
    age: Joi.number().min(4).max(130)
}).min(1);

export const userUpdateParamsSchema = Joi.object({
    id: Joi.string().uuid().required()
});

export const userDeleteParamsSchema = Joi.object({
    id: Joi.string().uuid().required()
});
