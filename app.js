require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const booksRouter = require('./routes/books');

const app = express();

app.use(express.json()); 
app.use(cors());
app.use(morgan('dev')); 
app.use(cookieParser()); 

app.use('/books', booksRouter);
app.get('/', (req, res) => {
    res.send('שרת הספרייה באוויר ועובד מעולה!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});