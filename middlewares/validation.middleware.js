/**
 * @param {Object} schema 
 * @param {String} property 
 */
const validateRequest = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], { abortEarly: false });

        if (error) {
            const errorMessages = error.details.map(detail => detail.message);
            
            const validationError = new Error(errorMessages.join(', '));
            validationError.statusCode = 400; // Bad Request
            
            return next(validationError);
        }

        next();
    };
};

module.exports = validateRequest;