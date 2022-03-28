const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const UserRoutes = require('./routes/user');
const GlobalError = require('./utils/GlobalError');

const app = express();

// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Parse JSON bodies (as sent by API clients)
app.use(
    express.json({
        limit: '20kb',
    })
);

// Routes
app.use('/users', UserRoutes);

app.use('*', (req, res, next) => {
    const err = new GlobalError(404, 'fail', 'undefined route');
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
});

module.exports = app;
