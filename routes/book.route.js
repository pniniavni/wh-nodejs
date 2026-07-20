const express = require('express');
const router = express.Router();

const validateRequest = require('../middlewares/validation.middleware');
const bookController = require('../controllers/book.controller');

// טעינה בטוחה של הסכמות (מטפל גם ביצוא רגיל וגם ב-default export)
const schemas = require('../middlewares/validation.schemas');
const bookSchema = schemas.bookSchema || schemas.default?.bookSchema;
const updateBookSchema = schemas.updateBookSchema || schemas.default?.updateBookSchema;

// ראוטים לקבלת ספרים
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

// ראוטים לפעולות השאלה והחזרה
router.post('/:id/borrow', bookController.borrowBook); 
router.post('/:id/return', bookController.returnBook); 

// ראוט למחיקה
router.delete('/:id', bookController.deleteBook);

// ראוטים ליצירה ועדכון - עם אימות Joi
router.post('/', validateRequest(bookSchema), bookController.createBook);
router.put('/:id', validateRequest(updateBookSchema), bookController.updateBook);

module.exports = router;