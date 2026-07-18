const express = require('express');
const router = express.Router();

// מייבאים את ה-Controller של הספרים
const bookController = require('../controllers/book.controller');

// הגדרת הנתיבים וקישורם לפונקציות ב-Controller
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook); // עדכון ספר
router.post('/:id/borrow', bookController.borrowBook); // השאלת ספר
router.post('/:id/return', bookController.returnBook); // החזרת ספר
router.delete('/:id', bookController.deleteBook);

module.exports = router;