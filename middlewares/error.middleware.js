const notFound = (req, res, next) => {
    res.status(404).json({ message: "הנתיב המבוקש לא נמצא" });
};
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode).json({
        error: {
            message: err.message,
            type: 'server error',
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        }
    });
};

module.exports = { notFound, errorHandler };