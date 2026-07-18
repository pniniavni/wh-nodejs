require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const apiRouter = require('./routes/index.route');

const app = express();


app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.send('שרת שיעור שני באוויר בהצלחה!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});