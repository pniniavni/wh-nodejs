let books = [
    {
        id: "1",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        year: 1937,
        category: "Fantasy",
        price: 45,
        isBorrowed: false,
        borrowerName: "",
        borrowDate: ""
    },
    {
        id: "2",
        title: "Harry Potter",
        author: "J.K. Rowling",
        year: 1997,
        category: "Fantasy",
        price: 50,
        isBorrowed: false,
        borrowerName: "",
        borrowDate: ""
    }
];

const getAllBooks = (req, res) => {
    res.json(books);
};

const getBookById = (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ message: "הספר לא נמצא" });
    }
    res.json(book);
};

const createBook = (req, res) => {
    const { title, author, year, category, price } = req.body;

    const newBook = {
        id: (books.length + 1).toString(),
        title,
        author,
        year,
        category,
        price,
        isBorrowed: false,
        borrowerName: "",
        borrowDate: ""
    };

    books.push(newBook);
    res.status(201).json({ message: "הספר נוסף בהצלחה!", book: newBook });
};

const updateBook = (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ message: "הספר לעדכון לא נמצא" });
    }

    const { title, author, year, category, price } = req.body;
    if (title) book.title = title;
    if (author) book.author = author;
    if (year) book.year = year;
    if (category) book.category = category;
    if (price) book.price = price;

    res.json({ message: "הספר עודכן בהצלחה", book });
};

const borrowBook = (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ message: "הספר לא נמצא" });
    }

    if (book.isBorrowed) {
        return res.status(400).json({ message: "הספר כבר מושאל למישהו אחר" });
    }

    const { borrowerName } = req.body;
    if (!borrowerName) {
        return res.status(400).json({ message: "יש לציין את שם השואל" });
    }

    book.isBorrowed = true;
    book.borrowerName = borrowerName;
    book.borrowDate = new Date().toLocaleDateString();

    res.json({ message: "הספר הושאל בהצלחה!", book });
};

const returnBook = (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
        return res.status(404).json({ message: "הספר לא נמצא" });
    }

    if (!book.isBorrowed) {
        return res.status(400).json({ message: "הספר הזה אינו מושאל כרגע" });
    }

    book.isBorrowed = false;
    book.borrowerName = "";
    book.borrowDate = "";

    res.json({ message: "הספר הוחזר לספרייה בהצלחה!", book });
};

const deleteBook = (req, res) => {
    const bookIndex = books.findIndex(b => b.id === req.params.id);
    if (bookIndex === -1) {
        return res.status(404).json({ message: "הספר למחיקה לא נמצא" });
    }

    const deleted = books.splice(bookIndex, 1);
    res.json({ message: "הספר נמחק בהצלחה", book: deleted[0] });
};
module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    borrowBook,
    returnBook,
    deleteBook
};