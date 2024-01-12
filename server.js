require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const path = require('path');
const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const headersSettings = require('./config/headersSettings');
//const setHeaders = require('./middleware/setHeaders');

const PORT = process.env.PORT || 3500;

connectDB();

app.use(logger);

app.use(express.json());

app.use(cookieParser());

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.options('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', headersSettings.origin);
    res.setHeader('Access-Control-Allow-Methods', headersSettings.methods);
    res.setHeader('Access-Control-Allow-Headers', headersSettings.headers);
    res.header('Access-Control-Allow-Credentials', true);
    res.sendStatus(204);
});

app.use((req, res, next) => {
    console.log();
    res.setHeader('Access-Control-Allow-Origin', headersSettings.origin);
    res.setHeader('Access-Control-Allow-Methods', headersSettings.methods);
    res.setHeader('Access-Control-Allow-Headers', headersSettings.headers);
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

//app.use(cors(corsOptions));

//app.options('*', cors(corsOptions));

// app.options('https://worknotes.onrender.com', (req, res, next) => {
//     console.log('preflight');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.status(204).send();
//     res.json({ msg: 'i am preflight' });
//     next();
// });

// app.options('*', (req, res) => {
//     console.log('preflight');
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header(
//         'Access-Control-Allow-Methods',
//         'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
//     );
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     res.sendStatus(204);
// });

// app.use(setHeaders);

// app.get('/', function (req, res, next) {
//     res.json({ msg: 'This is CORS-enabled for an allowed domain.' });
// });

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/notes', require('./routes/noteRoutes'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
    console.log(err);
    logEvents(
        `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
        'mongoErrLog.log'
    );
});
