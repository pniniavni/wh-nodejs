const Joi = require('joi');

const currentYear = new Date().getFullYear();

const bookSchema = Joi.object({
    title: Joi.string().min(2).max(100).required().messages({
        'string.empty': 'שם הספר אינו יכול להיות ריק',
        'string.min': 'שם הספר חייב להכיל לפחות 2 תווים',
        'any.required': 'שם הספר הוא שדה חובה'
    }),
    author: Joi.object({
        name: Joi.string().required().messages({
            'string.empty': 'שם המחבר אינו יכול להיות ריק',
            'any.required': 'שם המחבר הוא שדה חובה'
        }),
        phone: Joi.string().optional(),
        email: Joi.string().email().optional()
    }).required().messages({
        'any.required': 'פרטי המחבר הם שדה חובה'
    }),
    year: Joi.number().integer().min(1450).max(currentYear).required().messages({
        'number.base': 'שנת ההוצאה חייבת להיות מספר שלם',
        'number.integer': 'שנת ההוצאה חייבת להיות מספר שלם',
        'number.min': 'שנת ההוצאה חייבת להיות אחרי 1450',
        'number.max': `שנת ההוצאה חייבת להיות עד ${currentYear}`,
        'any.required': 'שנת ההוצאה היא שדה חובה'
    }),
    category: Joi.string().valid('mth', 'programming', 'fiction', 'general').required().messages({
        'string.empty': 'קטגוריה אינה יכולה להיות ריקה',
        'any.only': 'הקטגוריה חייבת להיות אחת מהאפשרויות המותרות',
        'any.required': 'קטגוריה היא שדה חובה'
    }),
    price: Joi.number().positive().required().messages({
        'number.base': 'המחיר חייב להיות מספר',
        'number.positive': 'המחיר חייב להיות גדול מאפס',
        'any.required': 'מחיר הוא שדה חובה'
    })
});

const updateBookSchema = Joi.object({
    title: Joi.string().min(2).max(100).messages({
        'string.empty': 'שם הספר אינו יכול להיות ריק',
        'string.min': 'שם הספר חייב להכיל לפחות 2 תווים'
    }),
    author: Joi.object({
        name: Joi.string().min(2).max(50).messages({
            'string.empty': 'שם הסופר אינו יכול להיות ריק',
            'string.min': 'שם הסופר חייב להכיל לפחות 2 תווים'
        }),
        phone: Joi.string().optional(),
        email: Joi.string().email().optional()
    }).optional(),
    year: Joi.number().integer().min(1450).max(currentYear).messages({
        'number.base': 'שנת ההוצאה חייבת להיות מספר שלם',
        'number.integer': 'שנת ההוצאה חייבת להיות מספר שלם',
        'number.min': 'שנת ההוצאה חייבת להיות אחרי 1450',
        'number.max': `שנת ההוצאה חייבת להיות עד ${currentYear}`
    }),
    category: Joi.string().valid('mth', 'programming', 'fiction', 'general').messages({
        'string.empty': 'קטגוריה אינה יכולה להיות ריקה',
        'any.only': 'הקטגוריה חייבת להיות אחת מהאפשרויות המותרות'
    }),
    price: Joi.number().positive().messages({
        'number.base': 'המחיר חייב להיות מספר',
        'number.positive': 'המחיר חייב להיות גדול מאפס'
    })
}).min(1).messages({
    'object.min': 'יש לשלוח לפחות שדה אחד לעדכון הספר'
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

const userLoginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'כתובת האימייל אינה תקינה',
        'any.required': 'אימייל הוא שדה חובה'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'הסיסמה אינה יכולה להיות ריקה',
        'any.required': 'הסיסמה היא שדה חובה'
    })
});

module.exports = {
    bookSchema,
    updateBookSchema,
    userRegisterSchema,
    userLoginSchema
};