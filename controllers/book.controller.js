const Book = require('../models/book.model');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בשליפת הספרים', error: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'הספר לא נמצא' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'שגיאה בשליפת הספר', error: error.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: 'שגיאה ביצירת הספר', error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: 'הספר לא נמצא' });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: 'שגיאה בעדכון הספר', error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'הספר לא נמצא' });
    }
    res.status(200).json({ message: 'הספר נמחק בהצלחה' });
  } catch (error) {
    res.status(500).json({ message: 'שגיאה במחיקת הספר', error: error.message });
  }
};