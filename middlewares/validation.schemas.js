const Joi = require('joi');

const bookSchema = Joi.object({
    title: Joi.string().min(2).max(100).required().messages({
        'string.empty': 'שם הספר אינו יכול להיות ריק',
        'string.min': 'שם הספר חייב להכיל לפחות 2 תווים',
        'any.required': 'שם הספר הוא שדה חובה'
    }),
    author: Joi.string().min(2).max(50).required().messages({
        'string.empty': 'שם הסופר אינו יכול להיות ריק',
        'any.required': 'שם הסופר הוא שדה חובה'
    }),
    category: Joi.string().min(3).max(30).required().messages({
        'string.empty': 'קטגוריה אינה יכולה להיות ריקה',
        'any.required': 'קטגוריה היא שדה חובה'
    }),
    price: Joi.number().positive().required().messages({
        'number.base': 'המחיר חייב להיות מספר',
        'number.positive': 'המחיר חייב להיות גדול מאפס',
        'any.required': 'מחיר הוא שדה חובה'
    })
});

const userRegisterSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
        'string.empty': 'שם המשתמש אינו יכול להיות ריק',
        'string.min': 'שם המשתמש חייב להכיל לפחות 3 תווים',
        'any.required': 'שם המשתמש הוא שדה חובה'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'כתובת האימייל אינה תקינה',
        'any.required': 'אימייל הוא שדה חובה'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'הסיסמה חייבת להכיל לפחות 6 תווים',
        'any.required': 'הסיסמה היא שדה חובה'
    })
});

module.exports = {
    bookSchema,
    userRegisterSchema
};