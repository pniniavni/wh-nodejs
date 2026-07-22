const express = require('express');
const router = express.Router();

const validateRequest = require('../middlewares/validation.middleware');
const bookController = require('../controllers/book.controller');

const schemas = require('../middlewares/validation.schemas');
const bookSchema = schemas?.bookSchema || schemas?.default?.bookSchema;
const updateBookSchema = schemas?.updateBookSchema || schemas?.default?.updateBookSchema;
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', validateRequest(bookSchema), bookController.createBook);
router.put('/:id', validateRequest(updateBookSchema), bookController.updateBook);

router.delete('/:id', bookController.deleteBook);

module.exports = router;