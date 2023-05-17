import Joi from "joi";

export const authValidator = Joi.object({
    username: Joi.string().regex(/[a-zA-Z]\w{1,19}$/).messages({
        'string.pattern.base': 'Username must start with letter and consist letters numbers or _. Length min 2 and max 20 characters'
    }).required(),
    password: Joi.string().regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s])\S{8,20}$/).messages({
        'string.pattern.base': 'Password must consist from 1 uppercase character, 1 number at least, 1 non-alphanumeric, 1 lowercase. Length min 8 max 20 symbols'
    })
})

