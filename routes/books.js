const express = require('express');
const router = express.Router();

let books = [
    {
        id: "1",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        category: "Fantasy",
        price: 45
    },
    {
        id: "2",
        title: "Harry Potter",
        author: "J.K. Rowling",
        category: "Fantasy",
        price: 50
    }
];

router.get('/', (req, res) => {
    res.json(books); 
});

router.get('/:id', (req, res) => {
    const bookId = req.params.id;
    const book = books.find(b => b.id === bookId); 
    
    if (!book) {
        return res.status(404).json({ message: "הספר לא נמצא בשרת" });
    }
    
    res.json(book);
});

router.post('/', (req, res) => {
    const { title, author, category, price } = req.body; 

    if (!title || !author || !category || !price) {
        return res.status(400).json({ message: "נא למלא את כל שדות החובה: כותרת, מחבר, קטגוריה ומחיר" });
    }

    const newBook = {
        id: (books.length + 1).toString(),
        title,
        author,
        category,
        price
    };

    books.push(newBook);  
    res.status(201).json({ message: "הספר נוסף בהצלחה!", book: newBook });
});

router.delete('/:id', (req, res) => {
    const bookId = req.params.id;
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ message: "הספר שברצונך למחוק לא נמצא" });
    }

    const deletedBook = books.splice(bookIndex, 1); // מוחק את הספר מהמערך
    res.json({ message: "הספר נמחק בהצלחה!", book: deletedBook[0] });
});

module.exports = router;