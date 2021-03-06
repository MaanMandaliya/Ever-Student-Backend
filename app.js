const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const Authorization = require('./middlewares/Authorization');
const UserRoutes = require('./routes/user');
const CourseRoutes = require('./routes/course');
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

// Middleware: Authorization
app.use(Authorization);

// Routes
app.use('/users', UserRoutes);
app.use('/courses', CourseRoutes);

app.use('*', (req, res, next) => {
    const err = new GlobalError(404, 'failed', 'undefined route');
    err.sendError(res);
});

module.exports = app;
