const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const routes = require('./routes/index.route'); 

const { requestLogger, timeRestrictor } = require('./middlewares/custom.middleware');

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: { message: "יותר מדי בקשות מכתובת זו, נא לנסות שוב מאוחר יותר." }
});

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());

app.use(requestLogger);
app.use(timeRestrictor);

app.use('/api', routes);
const { notFound, errorHandler } = require('./middlewares/error.middleware');
app.use(notFound);      
app.use(errorHandler);