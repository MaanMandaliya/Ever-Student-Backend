const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');

const database = process.env.database;

mongoose.connect(database).then((con) => {
    console.log('Database Connection Successful');
});

// Start the server
const port = process.env.port;
app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err.message);
});
