require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const routes = require('./routes/index.route'); 
const { requestLogger, timeRestrictor } = require('./middlewares/custom.middleware');
const { notFound, errorHandler } = require('./middlewares/error.middleware');
const connectDB = require('./config/db');

const app = express();
connectDB();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: { message: "יותר מדי בקשות מכתובת זו, נא לנסות שוב מאוחר יותר." }
});

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(morgan('dev')); 
app.use(cookieParser()); 

app.use(requestLogger);
// app.use(timeRestrictor); 

app.get('/', (req, res) => {
    res.send('שרת הספרייה באוויר ועובד מעולה!');
});

app.use('/api', routes);

app.use(notFound);   
app.use(errorHandler);   

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
